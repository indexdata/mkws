mkws.registerWidgetType('Builder', function() {
    var team = this.team;

    this.button = $('<button/>', {
        type: 'button',
        text: this.config.text || "Build!"
    });
    $(this.node).append(this.button);
    this.button.click(function() {
        var   query = team.widget('Query').value();
        var    sort = team.widget('Sort').value();
        var perpage = team.widget('Perpage').value();

        var html = ('<div class="mkwsRecords" ' +
                    'autosearch="' + query + '" ' +
                    'sort="' + sort + '" ' +
                    'perpage="' + perpage + '"></div>');
        alert(html);
    });
});
