// Options for Grammalecte
/*jslint esversion: 6*/
/*global exports*/


// Map
/*jslint esversion: 6*/

if (Map.prototype.grammalecte === undefined) {
    Map.prototype.gl_shallowCopy = function () {
        let oNewMap = new Map();
        for (let [key, val] of this.entries()) {
            oNewMap.set(key, val);
        }
        return oNewMap;
    };

    Map.prototype.gl_get = function (key, defaultValue) {
        let res = this.get(key);
        if (res !== undefined) {
            return res;
        }
        return defaultValue;
    };

    Map.prototype.gl_toString = function () {
        // Default .toString() gives nothing useful
        let sRes = "{ ";
        for (let [k, v] of this.entries()) {
            sRes += (typeof k === "string") ? '"' + k + '": ' : k.toString() + ": ";
            sRes += (typeof v === "string") ? '"' + v + '", ' : v.toString() + ", ";
        }
        sRes = sRes.slice(0, -2) + " }";
        return sRes;
    };

    Map.prototype.gl_update = function (dDict) {
        for (let [k, v] of dDict.entries()) {
            this.set(k, v);
        }
    };

    Map.prototype.gl_updateOnlyExistingKeys = function (dDict) {
        for (let [k, v] of dDict.entries()) {
            if (this.has(k)){
                this.set(k, v);
            }
        }
    };

    Map.prototype.gl_reverse = function () {
        let dNewMap = new Map();
        this.forEach((val, key) => {
            dNewMap.set(val, key);
        });
        return dNewMap;
    };

    Map.prototype.grammalecte = true;
}



var gc_options = {
    getOptions: function (sContext="JavaScript") {
        if (this.dOpt.hasOwnProperty(sContext)) {
            return this.dOpt[sContext];
        }
        return this.dOpt["JavaScript"];
    },

    lStructOpt: [('basic', [['typo', 'apos'], ['esp', 'tab'], ['nbsp', 'unit'], ['tu', 'maj'], ['num', 'virg'], ['nf', 'chim'], ['ocr', 'mapos'], ['liga']]), ('gramm', [['conf', 'sgpl', 'gn']]), ('verbs', [['infi', 'conj', 'ppas'], ['imp', 'inte', 'vmode']]), ('style', [['bs', 'pleo'], ['redon1', 'redon2'], ['neg']]), ('misc', [['date', 'mc']]), ('debug', [['idrule']])],

    dOpt: {
        "JavaScript": new Map ([["typo", true], ["apos", true], ["esp", false], ["tab", false], ["nbsp", false], ["tu", true], ["maj", true], ["num", true], ["virg", true], ["unit", false], ["nf", true], ["liga", false], ["mapos", false], ["chim", false], ["ocr", false], ["conf", true], ["sgpl", true], ["gn", true], ["infi", true], ["conj", true], ["ppas", true], ["imp", true], ["inte", true], ["vmode", true], ["bs", true], ["pleo", true], ["redon1", false], ["redon2", false], ["neg", false], ["date", true], ["mc", false], ["idrule", false], ["html", true], ["latex", false]]),
        "Firefox": new Map ([["typo", true], ["apos", true], ["esp", false], ["tab", false], ["nbsp", false], ["tu", true], ["maj", true], ["num", true], ["virg", true], ["unit", false], ["nf", true], ["liga", false], ["mapos", false], ["chim", false], ["ocr", false], ["conf", true], ["sgpl", true], ["gn", true], ["infi", true], ["conj", true], ["ppas", true], ["imp", true], ["inte", true], ["vmode", true], ["bs", true], ["pleo", true], ["redon1", false], ["redon2", false], ["neg", false], ["date", true], ["mc", false], ["idrule", false], ["html", true], ["latex", false]]),
        "Thunderbird": new Map ([["typo", true], ["apos", true], ["esp", false], ["tab", false], ["nbsp", false], ["tu", true], ["maj", true], ["num", true], ["virg", true], ["unit", false], ["nf", true], ["liga", false], ["mapos", false], ["chim", false], ["ocr", false], ["conf", true], ["sgpl", true], ["gn", true], ["infi", true], ["conj", true], ["ppas", true], ["imp", true], ["inte", true], ["vmode", true], ["bs", true], ["pleo", true], ["redon1", false], ["redon2", false], ["neg", false], ["date", true], ["mc", false], ["idrule", false], ["html", true], ["latex", false]]),
    },

    dOptLabel: {'fr': {'__optiontitle__': 'Grammalecte (Français)', 'basic': ['Typographie', ''], 'typo': ['Signes typographiques', ''], 'apos': ['Apostrophe typographique', 'Correction des apostrophes droites. Automatisme possible dans le menu Outils > Options d’autocorrection > Options linguistiques > Guillemets simples > Remplacer (à cocher)'], 'esp': ['Espaces surnuméraires', 'Signale les espaces inutiles entre les mots, en début et en fin de ligne.'], 'tab': ['Tabulations surnuméraires', 'Signale les tabulations inutiles en début et en fin de ligne.'], 'nbsp': ['Espaces insécables', 'Vérifie les espaces insécables avec les ponctuations «\xa0!\xa0?\xa0:\xa0;\xa0» (à désactiver si vous utilisez une police Graphite)'], 'maj': ['Majuscules', 'Vérifie l’utilisation des majuscules et des minuscules (par exemple, « la raison d’État », « les Européens »).'], 'virg': ['Virgules', 'Virgules manquantes avant “mais”, “car” et “etc.”.'], 'tu': ['Traits d’union', 'Cherche les traits d’union manquants ou inutiles.'], 'num': ['Nombres', 'Espaces insécables sur les grands nombres (> 10 000). Vérifie la présence de « O » au lieu de « 0 ».'], 'unit': ['Espaces insécables avant unités de mesure', ''], 'nf': ['Normes françaises', ''], 'liga': ['Signaler ligatures typographiques', 'Ligatures de fi, fl, ff, ffi, ffl, ft, st.'], 'mapos': ['Apostrophe manquante après lettres isolées [!]', 'Apostrophe manquante après les lettres l d s n c j m t ç. Cette option sert surtout à repérer les défauts de numérisation des textes et est déconseillée pour les textes scientifiques.'], 'chim': ['Chimie [!]', 'Typographie des composés chimiques (H₂O, CO₂, etc.).'], 'ocr': ['Erreurs de numérisation (OCR) [!]', 'Erreurs de reconnaissance optique des caractères. Beaucoup de faux positifs.'], 'gramm': ['Noms et adjectifs', ''], 'conf': ['Confusions et faux-amis', 'Cherche des erreurs souvent dues à l’homonymie (par exemple, les confusions entre « faîte » et « faite »).'], 'sgpl': ['Pluriels (locutions)', 'Vérifie l’usage du pluriel ou du singulier dans certaines locutions.'], 'gn': ['Accords (genre et nombre)', 'Accords des noms et des adjectifs.'], 'verbs': ['Verbes', ''], 'conj': ['Conjugaisons', 'Accord des verbes avec leur sujet.'], 'infi': ['Infinitif', 'Confusion entre l’infinitif et d’autres formes.'], 'imp': ['Impératif', 'Vérifie notamment la deuxième personne du singulier (par exemple, les erreurs : « vas … », « prend … », « manges … »).'], 'inte': ['Interrogatif', 'Vérifie les formes interrogatives et suggère de lier les pronoms personnels avec les verbes.'], 'ppas': ['Participes passés, adjectifs', ''], 'vmode': ['Modes verbaux', ''], 'style': ['Style', ''], 'bs': ['Populaire', 'Souligne un langage courant considéré comme erroné, comme « malgré que ».'], 'pleo': ['Pléonasmes', 'Repère des redondances sémantiques, comme « au jour d’aujourd’hui », « monter en haut », etc.'], 'neg': ['Adverbe de négation [!]', 'Ne … pas, ne … jamais, etc.'], 'redon1': ['Répétitions dans le paragraphe [!]', 'Sont exclus les mots grammaticaux, ceux commençant par une majuscule, ainsi que “être” et “avoir”.'], 'redon2': ['Répétitions dans la phrase [!]', 'Sont exclus les mots grammaticaux, ainsi que “être” et “avoir”.'], 'misc': ['Divers', ''], 'mc': ['Mots composés [!]', 'Vérifie si les mots composés à trait d’union existent dans le dictionnaire (hormis ceux commençant par ex-, mi-, quasi-, semi-, non-, demi- et d’autres préfixes communs).'], 'date': ['Validité des dates', ''], 'debug': ['Débogage', ''], 'idrule': ['Identifiant des règles de contrôle [!]', 'Affiche l’identifiant de la règle de contrôle dans les messages d’erreur.']}, 'en': {'__optiontitle__': 'Grammar checking (French)', 'basic': ['Typography', ''], 'typo': ['Typographical glyphs', ''], 'apos': ['Typographical apostrophe', 'Detects typewriter apostrophes. You may get automatically typographical apostrophes in Tools > Autocorrect options > Localized options > Single quote > Replace (checkbox).'], 'esp': ['Useless spaces', 'Checks spaces within words and at the beginning and the end of lines.'], 'tab': ['Useless tabulations', 'Checks tabulations at the beginning and the end of lines.'], 'nbsp': ['Non-breakable spaces', 'Checks the use of non-breakable spaces with the following punctuation marks: « ! ? : ; » (deactivate it if you use a Graphite font).'], 'maj': ['Capitals', 'Checks the use of uppercase and lowercase letters (i.e. « la raison d’État », « les Européens »).'], 'virg': ['Commas', 'Missing commas before “mais”, “car” and “etc.”.'], 'tu': ['Hyphens', 'Checks missing or useless hyphens.'], 'num': ['Numbers', 'Large numbers and « O » instead of « 0 ».'], 'unit': ['Non-breaking spaces before units of measurement', ''], 'nf': ['French standards', ''], 'liga': ['Report typographical ligatures', 'Ligatures of fi, fl, ff, ffi, ffl, ft, st.'], 'mapos': ['Missing apostrophes after single letters [!]', 'Missing apostrophes after l d s n c j m t ç. This option is mostly useful to detect defects of digitized texts and is not recommended for scientific texts.'], 'chim': ['Chemistry [!]', 'Typography for molecules (H₂O, CO₂, etc.)'], 'ocr': ['OCR errors [!]', 'Warning: many false positives.'], 'gramm': ['Nouns and Adjectives', ''], 'conf': ['Confusions and false friends', 'Seeks errors often due to homonymy (i.e. confusions between « faîte » et « faite »).'], 'sgpl': ['Plural (locutions)', 'Checks the use of plural and singular in locutions.'], 'gn': ['Agreement (gender and number)', 'Agreement between nouns and adjectives.'], 'verbs': ['Verbs', ''], 'conj': ['Conjugation', 'Agreement between verbs and their subject.'], 'infi': ['Infinitive', 'Checks confusions between infinitive forms and other forms.'], 'imp': ['Imperative mood', 'Checks particularly verbs at second person singular (i.e. errors such as: « vas … », « prend … », « manges … »).'], 'inte': ['Interrogative mood', 'Checks interrogative forms and suggests linking the personal pronouns with verbs.'], 'ppas': ['Past participles, adjectives', 'Checks subject agreement with past participles and adjectives.'], 'vmode': ['Verbal modes', ''], 'style': ['Style', ''], 'bs': ['Popular style', 'Underlines misuse of language though informal and commonly used.'], 'pleo': ['Pleonasms', 'Semantic replications, like « au jour d’aujourd’hui », « monter en haut », etc.'], 'neg': ['Negation adverb [!]', 'Ne … pas, ne … jamais, etc.'], 'redon1': ['Duplicates in paragraph [!]', 'Are excluded grammatical words, words beginning by a capital letter, and also “être” and “avoir”.'], 'redon2': ['Duplicates in sentence [!]', 'Are excluded grammatical words, and also “être” and “avoir”.'], 'misc': ['Miscellaneous', ''], 'mc': ['Compound words [!]', 'Check if words with hyphen exist in the dictionary (except those beginning by ex-, mi-, quasi-, semi-, non-, demi- and other common prefixes).'], 'date': ['Date validity.', ''], 'debug': ['Debug', ''], 'idrule': ['Display control rule identifier [!]', 'Display control rule identifier in the context menu message.']}}
}


if (typeof(exports) !== 'undefined') {
	exports.getOptions = gc_options.getOptions;
	exports.lStructOpt = gc_options.lStructOpt;
    exports.dOpt = gc_options.dOpt;
	exports.dOptLabel = gc_options.dOptLabel;
}
