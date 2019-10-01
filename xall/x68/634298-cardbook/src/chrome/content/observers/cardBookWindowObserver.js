if ("undefined" == typeof(cardBookWindowPrefObserver)) {
	var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
	var { XPCOMUtils } = ChromeUtils.import("resource://gre/modules/XPCOMUtils.jsm");
	XPCOMUtils.defineLazyModuleGetter(this, "cardbookRepository", "chrome://cardbook/content/cardbookRepository.js", "cardbookRepository");

	var cardBookWindowPrefObserver = {
		register: function() {
			cardBookPrefObserverRepository.registerAll(this);
		},
		
		unregister: function() {
			cardBookPrefObserverRepository.unregisterAll(this);
		},
		
		observe: function(aSubject, aTopic, aData) {
			switch (aData) {
				case "panesView":
					ovl_cardbookLayout.orientPanes();
					break;
				case "viewABPane":
				case "viewABContact":
					ovl_cardbookLayout.resizePanes();
					break;
				case "mailPopularityTabView":
				case "technicalTabView":
				case "vcardTabView":
					wdw_cardbook.showCorrectTabs();
					break;
			}
		}
	};
};

if ("undefined" == typeof(cardBookWindowObserver)) {
	var cardBookWindowObserver = {
		register: function() {
			cardBookObserverRepository.registerAll(this);
		},
		
		unregister: function() {
			cardBookObserverRepository.unregisterAll(this);
		},
		
		observe: function(aSubject, aTopic, aData) {
			switch (aTopic) {
				case "cardbook.preferencesChanged":
					cardbookRepository.loadCustoms();
					wdw_cardbook.loadCssRules();
					var myColumns = cardbookTreeUtils.getColumnsState().split(',');
					wdw_cardbook.addTreeColumns();
					cardbookTreeUtils.setColumnsState(myColumns);
					wdw_cardbook.refreshWindow();
					break;
				case "cardbook.accountsLoaded":
					wdw_cardbook.loadFirstWindow();
					break;
				case "cardbook.addressbookCreated":
				case "cardbook.addressbookDeleted":
					wdw_cardbook.clearCard();
				case "cardbook.addressbookModified":
				case "cardbook.complexSearchLoaded":
					wdw_cardbook.loadCssRules();
				case "cardbook.syncFisnished":
					wdw_cardbook.setSearchRemoteHboxOnSyncFinished(aData);
				case "cardbook.syncRunning":
				case "cardbook.cardCreated":
				case "cardbook.cardModified":
				case "cardbook.cardsConverted":
				case "cardbook.cardsDeleted":
				case "cardbook.cardsDragged":
				case "cardbook.cardsMerged":
				case "cardbook.cardsDuplicated":
				case "cardbook.cardsImportedFromDir":
				case "cardbook.cardsImportedFromFile":
				case "cardbook.cardsPasted":
				case "cardbook.categoryConvertedToList":
				case "cardbook.categoryCreated":
				case "cardbook.categoryDeleted":
				case "cardbook.categoryRenamed":
				case "cardbook.categorySelected":
				case "cardbook.categoryUnselected":
				case "cardbook.displayNameGenerated":
				case "cardbook.emailCollectedByFilter":
				case "cardbook.emailDeletedByFilter":
				case "cardbook.linePasted":
				case "cardbook.listConvertedToCategory":
				case "cardbook.outgoingEmailCollected":
				case "cardbook.redoActionDone":
				case "cardbook.undoActionDone":
				case "cardbook.listCreatedFromNode":
				case "cardbook.nodeDeleted":
				case "cardbook.nodeRenamed":
					wdw_cardbook.refreshWindow(aData);
					break;
			}
		}
	};

	var cardBookWindowMutationObserver = {
		register: function() {
			var observer = new MutationObserver(function handleMutations(mutations) {
				if (cardbookRepository.cardbookReorderMode == "NOREORDER") {
					cardbookTreeUtils.saveColumnsState();
				}
			});
			observer.observe(document.getElementById("cardsTreecols"), {
				attributes: true,
				subtree: true,
				attributeFilter: ["hidden", "ordinal", "width"]
			});
		}
	};
};