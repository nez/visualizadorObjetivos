
	function getIndicadorSer(indicador,ser){
		var estados = [];
	  console.log("Indicador",indicador," -> Serie",ser);
		$.ajax({
		  type: 'POST',
		  url: "https://operativos.inegi.org.mx/datos/api/Valores/PorClaveSerie",
		  data: {'PCveInd':indicador,'PAnoIni':'0', 'PAnoFin':'0', 'POrden':'DESC','PCveSer': ser , 'PIdioma':'ES'},
		  success: function( data, textStatus, jqxhr ) {
		  		//alert( "Exito" );
				console.log(data);
				console.log('------------------------------------- nuevo arreglo  --------------------');
				console.log(data.Series);
				console.log(data.Series[0]);
				console.log(data.Series[0].Coberturas);
				console.log(data.Series[0].Coberturas.length);

	  
	    			var temporal = [];
	    			temporal.push('Entidad');
	    			for (var j = 0; j < data.Series[0].Coberturas[0].ValorDato.length; j++) {
	    			temporal.push(data.Series[0].Coberturas[0].ValorDato[j].AADato_ser+'-01-01');
	    			}
	    			estados.push(temporal);


	    			for (var i = 0; i < data.Series[0].Coberturas.length; i++) {
	    				var temporal = [];
	    				temporal.push(data.Series[0].Coberturas[i].Descrip_cg);
	    				for (var j = 0; j < data.Series[0].Coberturas[i].ValorDato.length; j++) {
	    					temporal.push(data.Series[0].Coberturas[i].ValorDato[j].Dato_ser);
	    				}
	    				estados.push(temporal);
	    			}

	    			console.log(estados);

	    			var codigo_indicador = data.Codigo_ind;
	    			console.log(codigo_indicador);
	    			var descripcion = data.Descrip_ind;
	    			console.log(descripcion);

	    			//inicio =  1;
	    			setTimeout(function(){$('#preloader').fadeOut('slow',function(){$(this).remove();});},3000);
		  },
		  async:false
		});
		return estados;
	}


	function getAtributos(indicador){
		var atributos = [];
		$.ajax({
	   	  type: 'POST',
	   	  url: "https://operativos.inegi.org.mx/datos/api/AtrIndicador/PorDesglose",
	   	  data: {'PCveInd':indicador, 'PIdioma':'ES' , "POpcion":"Cl" },
	   	  success: function( data, textStatus, jqxhr )
	      {
	        atributos = data;
	      },
	      error:function( data, textStatus, responseJSON )
	      {
	        console.log(data);
	      },
	  	  async:false
	    });

	    return atributos;
	}

	//regresa todos los objetivos con todas las metas y todos los indicadores
	function getIndicadores(){
		var indicadores = [];
		$.ajax({
	   	  type: 'POST',
	   	  url: "https://operativos.inegi.org.mx/datos/api/Tematica/todos",
	   	  data: {'PIdioma':'ES'},
	   	  success: function( data, textStatus, jqxhr )
	      {
	        indicadores = data;
	      },
	      error:function( data, textStatus, responseJSON )
	      {
	        console.log(data);
	      },
	  	  async:false
	    });

	    return indicadores;
	}

function getMetadatos(indicador){
	var metadatos = [];
		$.ajax({
	   	  type: 'POST',
	   	  url: "https://operativos.inegi.org.mx/datos/api/Metadato/PorClave",
	   	  data: {"PCveInd":indicador, "PIdioma":"ES"},
	   	  success: function( data, textStatus, jqxhr )
	      {
	        metadatos = data;
	      },
	      error:function( data, textStatus, responseJSON )
	      {
	        console.log(data);
	      },
	  	  async:false
	    });

	    return metadatos;
}


function getAtr(indicador){
	var metadatos = [];
		$.ajax({
	   	  type: 'POST',
	   	  url: "https://operativos.inegi.org.mx/datos/api/AtrIndicador/PorClave",
	   	  data: {"PCveInd":indicador, "PIdioma":"ES"},
	   	  success: function( data, textStatus, jqxhr )
	      {
	        metadatos = data;
	      },
	      error:function( data, textStatus, responseJSON )
	      {
	        console.log(data);
	      },
	  	  async:false
	    });

	    return metadatos;
}



	