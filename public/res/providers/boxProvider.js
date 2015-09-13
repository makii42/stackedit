define([
    "utils",
    "classes/Provider",
    "settings",
    "helpers/boxHelper"
], function(utils, Provider, settings, boxHelper) {

    var boxProvider = new Provider("box", "Box");
    boxProvider.publishPreferencesInputIds = [
        "github-reponame",
        "github-username",
        "github-branch"
    ];

    boxProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var commitMsg = settings.commitMsg;
        boxHelper.upload(publishAttributes.repository, publishAttributes.username, publishAttributes.branch, publishAttributes.path, content, commitMsg, callback);
    };

    boxProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.repository = utils.getInputTextValue("#input-publish-github-reponame", event);
        publishAttributes.username = utils.getInputTextValue("#input-publish-github-username");
        publishAttributes.branch = utils.getInputTextValue("#input-publish-github-branch", event);
        publishAttributes.path = utils.getInputTextValue("#input-publish-file-path", event);
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return boxProvider;
});