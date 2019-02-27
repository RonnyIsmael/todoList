'use strict';

module.exports = function(Todo) {
  Todo.beforeRemote('create', function(context, todo, next) {
      var fechaActual = new Date();
      var entradaFecha = new Date(context.args.data.date);
    console.log(fechaActual);
    console.log(entradaFecha);


    if(fechaActual > entradaFecha){
      var error = new Error("No es posible generar un evento pasado");
      error.status = 400;
      console.log("hola");
      next(error);
    }else {
      context.args.data.usuarioId = context.req.accessToken.userId;
      next();
    }

  });


  /**
   * devuelve eventos
   * @param {object} ctx objeto
   * @param {Function(Error, array)} callback
   */

  Todo.eventosPendientes = function(ctx, callback) {
    console.log(ctx.req.accessToken.userId);
    var user=ctx.req.accessToken.userId;
    Todo.find({
      where:{and:[{usuarioId:user},{isComplete:false}]

      }
    },function (err,eventosPendientes) {
      callback(null, eventosPendientes);
    })

  };

};
