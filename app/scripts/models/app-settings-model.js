const Backbone = require('backbone');
const SettingsStore = require('../comp/settings-store');

const AppSettingsModel = Backbone.Model.extend({
    defaults: {
        theme: 'hc',
        locale: null,
        expandGroups: true,
        listViewWidth: null,
        menuViewWidth: null,
        tagsViewHeight: null,
        autoUpdate: 'install',
        clipboardSeconds: 0,
        autoSave: true,
        rememberKeyFiles: false,
        idleMinutes: 15,
        minimizeOnClose: false,
        tableView: true,
        colorfulIcons: true,
        titlebarStyle: 'default',
        lockOnMinimize: true,
        lockOnCopy: false,
        lockOnAutoType: false,
        lockOnOsLock: false,
        helpTipCopyShown: false,
        templateHelpShown: false,
        skipOpenLocalWarn: false,
        hideEmptyFields: false,
        skipHttpsWarning: false,
        demoOpened: false,
        fontSize: 2,
        tableViewColumns: null,
        generatorPresets: null,
        cacheConfigSettings: false,

        canOpen: false,
        canOpenDemo: false,
        canOpenSettings: true,
        canCreate: true,
        canImportXml: false,
        canRemoveLatest: true,

        dropbox: false,
        webdav: false,
        gdrive: false,
        onedrive: false
    },

    initialize: function() {
        this.listenTo(this, 'change', this.save);
    },

    load: function() {
        return SettingsStore.load('app-settings').then(data => {
            if (data) {
                this.upgrade(data);
                this.set(data, {silent: true});
            }
        });
    },

    upgrade: function(data) {
        if (data.rememberKeyFiles === true) {
            data.rememberKeyFiles = 'data';
        }
        if (data.versionWarningShown) {
            delete data.versionWarningShown;
        }
    },

    save: function() {
        SettingsStore.save('app-settings', this.attributes);
    }
});

AppSettingsModel.instance = new AppSettingsModel();

module.exports = AppSettingsModel;
