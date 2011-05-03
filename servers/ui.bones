server = Bones.Server.extend({
    initialize: function(plugin) {
        this.port = plugin.config.uiPort;
        this.server.enable('jsonp callback');
        this.server.error(Error.HTTP.handler(plugin.config));

        routers['Host'].register(this);
        routers['Wax'].register(this);
        routers['Syslog'].register(this);
        (plugin.config.tilePort === plugin.config.uiPort) && routers['Tile'].register(this);

        // @TODO: consider change in Bones as it's not clear that the core
        // router must be registered before all other components.
        routers['Core'].register(this);
        _(['models', 'views', 'controllers', 'templates']).each(_(function(kind) {
            _(plugin[kind]).each(_(function(object) {
                object.register(this);
            }).bind(this));
        }).bind(this));
    }
});
