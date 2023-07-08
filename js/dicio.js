
afterLoad(function() {
	let url = "http://services.flip.pt/dlpo2transformsac/dlpo_format.asmx";
	// let url = 'http://services.priberam.pt/Pesquisa';
	let env = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://services.priberam.pt/">
    	<soap:Header/>
    	<soap:Body>
  		  <ser:Pesquisa>
  				<ser:TextoAPesquisar>alvará</ser:TextoAPesquisar>
  				<ser:PrimeiraPosicao>1</ser:PrimeiraPosicao>
  				<ser:ResultadosPorPagina>20</ser:ResultadosPorPagina>
  				<ser:TotalResultados>50</ser:TotalResultados>
  				<ser:PaginaActual>1</ser:PaginaActual>
  				<ser:Modo>Android</ser:Modo>
  				<ser:acordo>true</ser:acordo>
  				<ser:lid>1046</ser:lid>
  		  </ser:Pesquisa>
    	</soap:Body>
    </soap:Envelope>`;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.onreadystatechange = function () {
		alert(xhr.status + " | " + xhr.responseText + " | " + xhr.responseXML);
		if (xhr.readyState == 4 && xhr.status == 200) {
			alert(xhr.responseText);
		}
	}
	
	xhr.setRequestHeader('Content-Type', 'text/xml');
	// xhr.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');
	// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(env);
});
