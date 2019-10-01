// This Source Code Form is subject to the terms of the
// GNU General Public License, version 3.0.

"use strict";

const {Services} = ChromeUtils.import("resource://gre/modules/Services.jsm");
const {MailServices} = ChromeUtils.import("resource:///modules/MailServices.jsm");

const nsIAbDirectory = Ci.nsIAbDirectory;

const verbose = 0;

function getCardForEmail(emailAddress) {
  // copied from msgHdrViewOverlay.js
  var books = MailServices.ab.directories;
  var result = { book: null, card: null };
  while (!result.card && books.hasMoreElements()) {
    var ab = books.getNext().QueryInterface(nsIAbDirectory);
    try {
      var card = ab.cardForEmailAddress(emailAddress);
      if (card) {
        result.book = ab;
        result.card = card;
      }
    }
    catch (ex) { }
  }
  return result;
}

function getDictForAddress(address) {
  var cardDetails = getCardForEmail(address);
  if (!cardDetails.card)
    return null;
  var dict = cardDetails.card.getProperty("Custom4", "");
  return dict;
}

function setDictionary (window) {
  if (verbose) console.log ("Setting Dictionary");

  // Get the first recipient.
  var fields = Components.classes["@mozilla.org/messengercompose/composefields;1"]
                         .createInstance(Components.interfaces.nsIMsgCompFields);
  window.Recipients2CompFields(fields);
  var recipients = { length: 0 };

  var fields_content = fields["to"];
  if (fields_content) {
    recipients = fields.splitRecipients(fields_content, true, {});
  }

  var firstRecipient = null;
  if (recipients.length > 0){
      firstRecipient = recipients[0].toString();
  }

  var existingRecipient = window.dictionaryForRecipient;
  if (verbose) console.log ("Found existing recipient |" + existingRecipient + "|");

  var infoText = null;
  var storeRecipient = null;
  if (firstRecipient) {
    if (firstRecipient == existingRecipient) {
      // We only set the dictionary once, as long as the recipient doesn't change.
      // This allows the user to change the dictionary, if they want to use a different
      // language as an exception. We don't want to reset the user choice.
      if (verbose) infoText = "Not setting dictionary for unchanged recipient " + firstRecipient;
    } else {
      var dict = getDictForAddress(firstRecipient);
      if (dict) {
        infoText = firstRecipient + " -> " + dict;
        storeRecipient = firstRecipient;
        var changeEvent = { target: { value: dict }, stopPropagation: function(){} };
        window.ChangeLanguage(changeEvent);
      } else {
        if (verbose) infoText = "Setting dictionary: " + firstRecipient + " has no dictionary defined";
        storeRecipient = "-";
      }
    }
  } else {
    if (verbose) infoText = "Setting dictionary: No recipient specified";
    storeRecipient = "-";
  }

  if (storeRecipient && storeRecipient != existingRecipient) {
    window.dictionaryForRecipient = storeRecipient;
    if (verbose) console.log ("Storing recipient |" + storeRecipient + "|");
  }

  if (infoText) {
    var statusText = window.document.getElementById("statusText");
    statusText.label = infoText;
    window.setTimeout(function() {
      statusText.label = "";
    }, 2000);
  }
}

function setListener1(window, target, on) {
  // Use closure to carry 'window' and 'on' into the callback function.
  var listener1 = function (evt){
    if (verbose) console.log("received event " + on);
    // Sadly, when focussing on the subject, the language change doesn't work, if we fire too early.
    // Also, when replying to an e-mail, the recipient sometimes cannot be retrieved, if we fire too early.
    // So wait 500 milliseconds.
    // Note Sept. 2017: Strange things happen: The language indicators switch to the new language
    // but the body remains in the original (default) language. This only happens on the first reply
    // after application start when quoted text is used.
    // Experiments showed that even 1100 ms were not enough, 1300 ms seemed to work.
    window.setTimeout(function() {
      setDictionary (window);
    }, 1300);
  }
  target.addEventListener(on, listener1);

  window.shutdown.push(function() {
    target.removeEventListener(on, listener1, false);
  });
}

function setListener2(window, target, on) {
  // Use closure to carry 'window' and 'on' into the callback function.
  var listener2 = function (evt){
    if (verbose) console.log("received event " + on);
    window.dictionaryForRecipient = "-";
  }
  target.addEventListener(on, listener2);

  window.shutdown.push(function() {
    target.removeEventListener(on, listener2, false);
  });
}

/**
 * We prepare the compose window by attaching our listeners and resetting our properties.
 */
function PrepareComposeWindow (window) {
  if (verbose) console.log ("Preparing compose window");

  window.shutdown = [];
  window.dictionaryForRecipient = "-";

  // If these avents arrive, we need to derive the dictionary again.
  setListener1(window, window.document.getElementById("msgSubject"), "focus");
  setListener1(window, window, "blur");
  setListener1(window, window.document.getElementById("msgcomposeWindow"), "compose-window-reopen");

  // When these events arrive, we need to do some cleanup, since we need to handle recycled windows.
  setListener2(window, window.document.getElementById("msgcomposeWindow"), "compose-window-close");
}

function CleanComposeWindow (window) {
  if (verbose) console.log ("Cleaning compose window");

  for (var i=0; i < window.shutdown.length; i++) {
    window.shutdown[i]();
  }
}

var ManageComposeWindows = {
  ww: Services.ww,       // nsIWindowWatcher
  wm: Services.wm,       // nsIWindowMediator

  aListener: {
    onOpenWindow: function (aWindow) {
      var win = aWindow.docShell.QueryInterface(
                Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindow);
      win.addEventListener("load", function loadListener() {
        this.removeEventListener("load", loadListener, false);
        if (win.document.location == "chrome://messenger/content/messengercompose/messengercompose.xul")
          PrepareComposeWindow(win);
      }, false);
    },
  },

  startup: function () {
    this.wm.addListener(this.aListener);
    var cw = this.ww.getWindowEnumerator();
    while (cw.hasMoreElements()) {
      var win = cw.getNext().QueryInterface(Ci.nsIDOMWindow);
      if (win.document.location == "chrome://messenger/content/messengercompose/messengercompose.xul")
        PrepareComposeWindow(win);
    }
  },

  shutdown: function () {
    this.wm.removeListener(this.aListener);
    var cw = this.ww.getWindowEnumerator();
    while (cw.hasMoreElements()) {
      var win = cw.getNext().QueryInterface(Ci.nsIDOMWindow);
      if (win.document.location == "chrome://messenger/content/messengercompose/messengercompose.xul")
        CleanComposeWindow(win);
    }
  },
}

function startup(data, reason) {
  ManageComposeWindows.startup();
}

function shutdown(data, reason) {
  ManageComposeWindows.shutdown();
}

function install(data, reason) {
}

function uninstall(data, reason) {
}
