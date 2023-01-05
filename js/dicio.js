// //wsdl request
// var client = new XMLHttpRequest();
// client.open('GET', 'request.wsdl');
// client.onreadystatechange = function () {
//   var request = client.responseText;//here the wsdl

//         //SOAP request
//         var client2 = new XMLHttpRequest();
//         client2.open('POST', 'http://83.212.96.238:8080/DgesvSampleWs/DgesvSampleWsService', true);

//         client2.onreadystatechange = function () {
//           if (client2.readyState == 4) {
//             if (client2.status == 200) {
//               console.log(client.responseText);//here the response
//             }
//           }
//         }
//         client2.setRequestHeader('Content-Type', 'text/xml');
//         client2.send(request);
// }

// client.send();




{/* <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
      <PesquisaResponse xmlns="http://services.priberam.pt/">
         <PesquisaResult><![CDATA[
					<verbetes total='5' prim='1' n='4'><base nome="dlpo" dll="LegixIsamLLDB" language="0"/><registo><id>15764</id><datadoc>17-02-2021</datadoc><datapub>17-02-2021</datapub><dataalteracao>17-02-2021</dataalteracao><titulo></titulo><designacao>alvará</designacao><fonte></fonte><texto><verbete verb_id="15764"><nome>alvará</nome><etimologia>árabe <i>al-baraâ</i>, carta, cédula, recibo</etimologia><estrangeirismo>0</estrangeirismo><notas>Confrontar: albará.</notas><verbete_dAO>alvará</verbete_dAO><verbete_dAO1>alvará</verbete_dAO1><verbete_pb>alvará</verbete_pb><verbete_pb_dAO>alvará</verbete_pb_dAO><hif>al.va.rá</hif><hif_dAO>al.va.rá</hif_dAO><hif_dAO1>al.va.rá</hif_dAO1><hif_pb>al.va.rá</hif_pb><hif_pb_dAO>al.va.rá</hif_pb_dAO><ordem>0</ordem><definicao><Categoria>n. m.</Categoria><Dominio></Dominio><Definicao>Documento que uma autoridade passa a favor de alguém, certificando, autorizando ou aprovando certos <var><pt><ac><aAO>actos</aAO><dAO>atos</dAO></ac></pt><pb>atos</pb></var> ou direitos (ex.: <i>alvará de construção</i>).</Definicao><ordem>0</ordem><Categoria_ext_aAO>nome masculino</Categoria_ext_aAO><Categoria_pb>s. m.</Categoria_pb><Categoria_ext_pb>substantivo masculino</Categoria_ext_pb></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Definicao>Antigo diploma rubricado pelo monarca e assinado pelo ministro, sobre negócios de interesse público ou particular.</Definicao><ordem>1</ordem></definicao></verbete></texto><nome>dlpo</nome></registo><descritores regid="15764"><descritor tipo='0' count='0'>aalrvá</descritor><descritor tipo='0' count='0'>aalrvá</descritor><descritor tipo='0' count='0'>aalrvá</descritor><descritor tipo='0' count='0'>aalrvá</descritor><descritor tipo='0' count='0'>aalrvá</descritor></descritores><organismos></organismos><textos></textos><base nome="dlpo" dll="LegixIsamLLDB" language="0"/><registo><id>15765</id><datadoc>17-02-2021</datadoc><datapub>17-02-2021</datapub><dataalteracao>17-02-2021</dataalteracao><titulo></titulo><designacao>alvaraz</designacao><fonte></fonte><texto><verbete verb_id="15765"><nome>alvaraz</nome><estrangeirismo>0</estrangeirismo><notas>Confrontar: alvarás, alvarraz.</notas><verbete_dAO>alvaraz</verbete_dAO><verbete_dAO1>alvaraz</verbete_dAO1><verbete_pb>alvaraz</verbete_pb><verbete_pb_dAO>alvaraz</verbete_pb_dAO><hif>al.va.raz</hif><hif_dAO>al.va.raz</hif_dAO><hif_dAO1>al.va.raz</hif_dAO1><hif_pb>al.va.raz</hif_pb><hif_pb_dAO>al.va.raz</hif_pb_dAO><ordem>0</ordem><definicao><Categoria>n. m.</Categoria><Dominio></Dominio><Definicao>Doença de pele que se manifesta em manchas brancas.</Definicao><ordem>0</ordem><Categoria_ext_aAO>nome masculino</Categoria_ext_aAO><Categoria_pb>s. m.</Categoria_pb><Categoria_ext_pb>substantivo masculino</Categoria_ext_pb></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Definicao>Bostela de cavalos.</Definicao><ordem>1</ordem></definicao><definicao><sinonimos>alvarazo</sinonimos><ordem>2</ordem></definicao></verbete></texto><nome>dlpo</nome></registo><descritores regid="15765"><descritor tipo='0' count='0'>aaalrvz</descritor><descritor tipo='0' count='0'>aaalrvz</descritor><descritor tipo='0' count='0'>aaalrvz</descritor><descritor tipo='0' count='0'>aaalrvz</descritor><descritor tipo='0' count='0'>aaalrvz</descritor></descritores><organismos></organismos><textos></textos><base nome="dlpo" dll="LegixIsamLLDB" language="0"/><registo><id>50738</id><datadoc>17-02-2021</datadoc><datapub>17-02-2021</datapub><dataalteracao>17-02-2021</dataalteracao><titulo></titulo><designacao>firmão</designacao><fonte></fonte><texto><verbete verb_id="50738"><nome>firmão</nome><etimologia>turco <i>ferman</i>, do persa <i>farman</i></etimologia><estrangeirismo>0</estrangeirismo><verbete_dAO>firmão</verbete_dAO><verbete_dAO1>firmão</verbete_dAO1><verbete_pb>firmão</verbete_pb><verbete_pb_dAO>firmão</verbete_pb_dAO><hif>fir.mão</hif><hif_dAO>fir.mão</hif_dAO><hif_dAO1>fir.mão</hif_dAO1><hif_pb>fir.mão</hif_pb><hif_pb_dAO>fir.mão</hif_pb_dAO><ordem>0</ordem><definicao><Categoria>n. m.</Categoria><Dominio></Dominio><Definicao>Decreto, provisão, alvará ou carta régia emanada de um soberano ou autoridade muçulmana e por ela assinada.</Definicao><sinonimos>firmã, formão</sinonimos><ordem>0</ordem><Categoria_ext_aAO>nome masculino</Categoria_ext_aAO><Categoria_pb>s. m.</Categoria_pb><Categoria_ext_pb>substantivo masculino</Categoria_ext_pb></definicao></verbete></texto><nome>dlpo</nome></registo><descritores regid="50738"><descritor tipo='0' count='0'>fimorã</descritor><descritor tipo='0' count='0'>fimorã</descritor><descritor tipo='0' count='0'>fimorã</descritor><descritor tipo='0' count='0'>fimorã</descritor><descritor tipo='0' count='0'>fimorã</descritor></descritores><organismos></organismos><textos></textos><base nome="dlpo" dll="LegixIsamLLDB" language="0"/><registo><id>14482</id><datadoc>17-02-2021</datadoc><datapub>17-02-2021</datapub><dataalteracao>17-02-2021</dataalteracao><titulo></titulo><designacao>albará</designacao><fonte></fonte><texto><verbete verb_id="14482"><nome>albará</nome><estrangeirismo>0</estrangeirismo><notas>Confrontar: alvará.</notas><verbete_dAO>albará</verbete_dAO><verbete_dAO1>albará</verbete_dAO1><verbete_pb>albará</verbete_pb><verbete_pb_dAO>albará</verbete_pb_dAO><hif>al.ba.rá</hif><hif_dAO>al.ba.rá</hif_dAO><hif_dAO1>al.ba.rá</hif_dAO1><hif_pb>al.ba.rá</hif_pb><hif_pb_dAO>al.ba.rá</hif_pb_dAO><ordem>0</ordem><definicao><Categoria>n. f.</Categoria><Dominio></Dominio><Registo>Bras.</Registo><Definicao>Planta da família das amomáceas (Canna angustifolia).</Definicao><ordem>0</ordem><Categoria_ext_aAO>nome feminino</Categoria_ext_aAO><Registo_ext_aAO>Brasil</Registo_ext_aAO><Categoria_pb>s. f.</Categoria_pb><Categoria_ext_pb>substantivo feminino</Categoria_ext_pb><Registo_pb>Bras.</Registo_pb><Registo_ext_pb>Brasil</Registo_ext_pb></definicao></verbete></texto><nome>dlpo</nome></registo><descritores regid="14482"><descritor tipo='0' count='0'>aablrá</descritor><descritor tipo='0' count='0'>aablrá</descritor><descritor tipo='0' count='0'>aablrá</descritor><descritor tipo='0' count='0'>aablrá</descritor><descritor tipo='0' count='0'>aablrá</descritor></descritores><organismos></organismos><textos></textos><base nome="dlpo" dll="LegixIsamLLDB" language="0"/><registo><id>41952</id><datadoc>17-02-2021</datadoc><datapub>17-02-2021</datapub><dataalteracao>17-02-2021</dataalteracao><titulo></titulo><designacao>ementa</designacao><fonte></fonte><texto><verbete verb_id="41952"><nome>ementa</nome><etimologia>derivação regressiva de <i>ementar</i></etimologia><estrangeirismo>0</estrangeirismo><verbete_dAO>ementa</verbete_dAO><verbete_dAO1>ementa</verbete_dAO1><verbete_pb>ementa</verbete_pb><verbete_pb_dAO>ementa</verbete_pb_dAO><hif>e.men.ta</hif><hif_dAO>e.men.ta</hif_dAO><hif_dAO1>e.men.ta</hif_dAO1><hif_pb>e.men.ta</hif_pb><hif_pb_dAO>e.men.ta</hif_pb_dAO><ordem>0</ordem><definicao><Categoria>n. f.</Categoria><Dominio></Dominio><Definicao>Breve apontamento para lembrança.</Definicao><ordem>0</ordem><Categoria_ext_aAO>nome feminino</Categoria_ext_aAO><Categoria_pb>s. f.</Categoria_pb><Categoria_ext_pb>substantivo feminino</Categoria_ext_pb></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Definicao>Sumário, resumo (do que se contém em requerimento, alvará, etc.)</Definicao><ordem>1</ordem></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Definicao>Lista; rol.</Definicao><ordem>2</ordem></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Definicao>Comemoração por defunto.</Definicao><ordem>3</ordem></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Definicao>Lista de pratos de uma refeição.</Definicao><sinonimos>cardápio, menu</sinonimos><ordem>4</ordem><imagem>ementa.jpg</imagem></definicao></verbete></texto><nome>dlpo</nome></registo><descritores regid="41952"><descritor tipo='0' count='0'>aeemnt</descritor><descritor tipo='0' count='0'>aeemnt</descritor><descritor tipo='0' count='0'>aeemnt</descritor><descritor tipo='0' count='0'>aeemnt</descritor><descritor tipo='0' count='0'>aeemnt</descritor></descritores><organismos></organismos><textos></textos></verbetes>
				]]></PesquisaResult>
      </PesquisaResponse>
   </soap:Body>
</soap:Envelope> */}


{/*
<verbetes total='9' prim='1' n='8'>
	<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
	<registo>
		<id>608077</id>
		<datadoc>21-09-2020</datadoc>
		<datapub>21-09-2020</datapub>
		<dataalteracao>21-09-2020</dataalteracao>
		<titulo></titulo>
		<designacao>punica fides</designacao>
		<fonte></fonte>
		<texto>
			<verbete verb_id="608077">
				<nome>punica fides</nome>
				<etimologia>locução latina que significa "fé púnica"</etimologia>
				<estrangeirismo>1</estrangeirismo>
				<verbete_dAO>punica fides</verbete_dAO>
				<verbete_dAO1>punica fides</verbete_dAO1>
				<verbete_pb>punica fides</verbete_pb>
				<verbete_pb_dAO>punica fides</verbete_pb_dAO>
				<hif>punica fides</hif>
				<hif_dAO>punica fides</hif_dAO>
				<hif_dAO1>punica fides</hif_dAO1>
				<hif_pb>punica fides</hif_pb>
				<hif_pb_dAO>punica fides</hif_pb_dAO>
				<ordem>0</ordem>
				<definicao>
					<Categoria>loc.</Categoria>
					<Definicao>Os romanos acusavam os cartagineses de violar muitas vezes os tratados, pelo que fé púnica equivale, pois, a má-fé.</Definicao>
					<ordem>0</ordem>
					<Categoria_ext_aAO>locução</Categoria_ext_aAO>
					<Categoria_pb>loc.</Categoria_pb>
					<Categoria_ext_pb>locução</Categoria_ext_pb>
				</definicao>
			</verbete>
		</texto>
		<nome>dlpo</nome>
	</registo>
	<descritores regid="608077">
		<descritor tipo='0' count='0'> acdefiinpsu</descritor>
		<descritor tipo='0' count='0'> acdefiinpsu</descritor>
		<descritor tipo='0' count='0'> acdefiinpsu</descritor>
		<descritor tipo='0' count='0'> acdefiinpsu</descritor>
		<descritor tipo='0' count='0'> acdefiinpsu</descritor>
	</descritores>
	<organismos></organismos>
	<textos></textos>
	<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
	<registo>
		<id>74354</id>
		<datadoc>17-02-2021</datadoc>
		<datapub>17-02-2021</datapub>
		<dataalteracao>17-02-2021</dataalteracao>
		<titulo></titulo>
		<designacao>pénulo</designacao>
		<fonte></fonte>
		<texto>
			<verbete verb_id="74354">
				<nome>pénulo</nome>
				<estrangeirismo>0</estrangeirismo>
				<verbete_dAO>pénulo</verbete_dAO>
				<verbete_dAO1>pénulo</verbete_dAO1>
				<verbete_pb>pênulo</verbete_pb>
				<verbete_pb_dAO>pênulo</verbete_pb_dAO>
				<hif>pé.nu.lo</hif>
				<hif_dAO>pé.nu.lo</hif_dAO>
				<hif_dAO1>pé.nu.lo</hif_dAO1>
				<hif_pb>pê.nu.lo</hif_pb>
				<hif_pb_dAO>pê.nu.lo</hif_pb_dAO>
				<ordem>0</ordem>
				<definicao>
					<Categoria>n. m.</Categoria>
					<Dominio></Dominio>
					<Definicao>Cartaginês.</Definicao>
					<ordem>0</ordem>
					<Categoria_ext_aAO>nome masculino</Categoria_ext_aAO>
					<Categoria_pb>s. m.</Categoria_pb>
					<Categoria_ext_pb>substantivo masculino</Categoria_ext_pb>
				</definicao>
			</verbete>
		</texto>
		<nome>dlpo</nome>
	</registo>
	<descritores regid="74354">
		<descritor tipo='0' count='0'>lnopué</descritor>
		<descritor tipo='0' count='0'>lnopué</descritor>
		<descritor tipo='0' count='0'>lnopué</descritor>
		<descritor tipo='0' count='0'>lnopuê</descritor>
		<descritor tipo='0' count='0'>lnopuê</descritor>
	</descritores>
	<organismos></organismos>
	<textos></textos>
	<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
	<registo>
		<id>28689</id>
		<datadoc>17-02-2021</datadoc>
		<datapub>17-02-2021</datapub>
		<dataalteracao>17-02-2021</dataalteracao>
		<titulo></titulo>
		<designacao>cartaginês</designacao>
		<fonte></fonte>
		<texto>
			<verbete verb_id="28689">
				<nome>cartaginês</nome>
				<estrangeirismo>0</estrangeirismo>
				<morfologia>Feminino: cartaginesa. Plural: cartagineses.</morfologia>
				<morfologia_pb>Feminino: cartaginesa. Plural: cartagineses.</morfologia_pb>
				<verbete_dAO>cartaginês</verbete_dAO>
				<verbete_dAO1>cartaginês</verbete_dAO1>
				<verbete_pb>cartaginês</verbete_pb>
				<verbete_pb_dAO>cartaginês</verbete_pb_dAO>
				<hif>car.ta.gi.nês</hif>
				<hif_dAO>car.ta.gi.nês</hif_dAO>
				<hif_dAO1>car.ta.gi.nês</hif_dAO1>
				<hif_pb>car.ta.gi.nês</hif_pb>
				<hif_pb_dAO>car.ta.gi.nês</hif_pb_dAO>
				<ordem>0</ordem>
				<definicao>
					<Categoria>adj.</Categoria>
					<Dominio></Dominio>
					<Definicao>Relativo a Cartago.</Definicao>
					<ordem>0</ordem>
					<Categoria_ext_aAO>adjectivo</Categoria_ext_aAO>
					<Categoria_ext_dAO>adjetivo</Categoria_ext_dAO>
					<Categoria_pb>adj.</Categoria_pb>
					<Categoria_ext_pb>adjetivo</Categoria_ext_pb>
				</definicao>
				<definicao>
					<Categoria>n. m.</Categoria>
					<Dominio></Dominio>
					<Definicao>Natural de Cartago.</Definicao>
					<ordem>1</ordem>
					<Categoria_ext_aAO>nome masculino</Categoria_ext_aAO>
					<Categoria_pb>s. m.</Categoria_pb>
					<Categoria_ext_pb>substantivo masculino</Categoria_ext_pb>
				</definicao>
				<definicao>
					<Dominio>Ling.</Dominio>
					<Definicao>Língua fenícia falada em Cartago.</Definicao>
					<ordem>2</ordem>
					<Dominio_ext_aAO>Linguística</Dominio_ext_aAO>
					<Dominio_pb>Ling.</Dominio_pb>
					<Dominio_ext_pb>Lingüística</Dominio_ext_pb>
					<Dominio_ext_pb_dAO>Linguística</Dominio_ext_pb_dAO>
				</definicao>
			</verbete>
		</texto>
		<nome>dlpo</nome>
	</registo>
	<descritores regid="28689">
		<descritor tipo='0' count='0'>aacginrstê</descritor>
		<descritor tipo='0' count='0'>aacginrstê</descritor>
		<descritor tipo='0' count='0'>aacginrstê</descritor>
		<descritor tipo='0' count='0'>aacginrstê</descritor>
		<descritor tipo='0' count='0'>aacginrstê</descritor>
	</descritores>
	<organismos></organismos>
	<textos></textos>
	<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
	<registo>
		<id>605026</id>
		<datadoc>17-02-2021</datadoc>
		<datapub>17-02-2021</datapub>
		<dataalteracao>17-02-2021</dataalteracao>
		<titulo></titulo>
		<designacao>moloque</designacao>
		<fonte></fonte>
		<texto>
			<verbete verb_id="605026">
				<nome>moloque</nome>
				<etimologia>
					<i>Moloque</i>,					<var>
						<pt>teónimo</pt>
						<pb>teônimo</pb>
					</var> [deus fenício, cartaginês e cananeu]</etimologia>
				<estrangeirismo>0</estrangeirismo>
				<verbete_dAO>moloque</verbete_dAO>
				<verbete_dAO1>moloque</verbete_dAO1>
				<verbete_pb>moloque</verbete_pb>
				<verbete_pb_dAO>moloque</verbete_pb_dAO>
				<hif>mo.lo.que</hif>
				<hif_dAO>mo.lo.que</hif_dAO>
				<hif_dAO1>mo.lo.que</hif_dAO1>
				<hif_pb>mo.lo.que</hif_pb>
				<hif_pb_dAO>mo.lo.que</hif_pb_dAO>
				<ordem>0</ordem>
				<definicao>
					<Categoria>n. m.</Categoria>
					<Dominio>Zool.</Dominio>
					<Definicao>Pequeno lagarto (<i>Moloch horridus</i>) encontrado na Austrália, cujo corpo é coberto de espinhos.</Definicao>
					<sinonimos>diabo-espinhoso</sinonimos>
					<ordem>0</ordem>
					<Categoria_ext_aAO>nome masculino</Categoria_ext_aAO>
					<Dominio_ext_aAO>Zoologia</Dominio_ext_aAO>
					<Categoria_pb>s. m.</Categoria_pb>
					<Categoria_ext_pb>substantivo masculino</Categoria_ext_pb>
					<Dominio_pb>Zool.</Dominio_pb>
					<Dominio_ext_pb>Zoologia</Dominio_ext_pb>
				</definicao>
			</verbete>
		</texto>
		<nome>dlpo</nome>
	</registo>
	<descritores regid="605026">
		<descritor tipo='0' count='0'>elmooqu</descritor>
		<descritor tipo='0' count='0'>elmooqu</descritor>
		<descritor tipo='0' count='0'>elmooqu</descritor>
		<descritor tipo='0' count='0'>elmooqu</descritor>
		<descritor tipo='0' count='0'>elmooqu</descritor>
	</descritores>
	<organismos></organismos>
	<textos></textos>
	<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
	<registo>
		<id>74257</id>
		<datadoc>17-02-2021</datadoc>
		<datapub>17-02-2021</datapub>
		<dataalteracao>17-02-2021</dataalteracao>
		<titulo></titulo>
		<designacao>pénico</designacao>
		<fonte></fonte>
		<texto>
			<verbete verb_id="74257">
				<nome>pénico</nome>
				<estrangeirismo>0</estrangeirismo>
				<verbete_dAO>pénico</verbete_dAO>
				<verbete_dAO1>pénico</verbete_dAO1>
				<verbete_pb>pênico</verbete_pb>
				<verbete_pb_dAO>pênico</verbete_pb_dAO>
				<hif>pé.ni.co</hif>
				<hif_dAO>pé.ni.co</hif_dAO>
				<hif_dAO1>pé.ni.co</hif_dAO1>
				<hif_pb>pê.ni.co</hif_pb>
				<hif_pb_dAO>pê.ni.co</hif_pb_dAO>
				<ordem>0</ordem>
				<definicao>
					<Categoria>adj. n. m.</Categoria>
					<Dominio></Dominio>
					<Definicao>Cartaginês.</Definicao>
					<ordem>0</ordem>
					<Categoria_ext_aAO>adjectivo e nome masculino</Categoria_ext_aAO>
					<Categoria_ext_dAO>adjetivo e nome masculino</Categoria_ext_dAO>
					<Categoria_pb>adj. s. m.</Categoria_pb>
					<Categoria_ext_pb>adjetivo e substantivo masculino</Categoria_ext_pb>
				</definicao>
			</verbete>
		</texto>
		<nome>dlpo</nome>
	</registo>
	<descritores regid="74257">
		<descritor tipo='0' count='0'>cinopé</descritor>
		<descritor tipo='0' count='0'>cinopé</descritor>
		<descritor tipo='0' count='0'>cinopé</descritor>
		<descritor tipo='0' count='0'>cinopê</descritor>
		<descritor tipo='0' count='0'>cinopê</descritor>
	</descritores>
	<organismos></organismos>
	<textos></textos>
	<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
	<registo>
		<id>74279</id>
		<datadoc>17-02-2021</datadoc>
		<datapub>17-02-2021</datapub>
		<dataalteracao>17-02-2021</dataalteracao>
		<titulo></titulo>
		<designacao>peno</designacao>
		<fonte></fonte>
		<texto>
			<verbete verb_id="74279">
				<nome>peno</nome>
				<ortoepia>ê</ortoepia>
				<estrangeirismo>0</estrangeirismo>
				<verbete_dAO>peno</verbete_dAO>
				<ortoepia_dAO>ê</ortoepia_dAO>
				<verbete_dAO1>peno</verbete_dAO1>
				<ortoepia_dAO1>ê</ortoepia_dAO1>
				<verbete_pb>peno</verbete_pb>
				<verbete_pb_dAO>peno</verbete_pb_dAO>
				<ortoepia_pb>ê</ortoepia_pb>
				<ortoepia_pb_dAO>ê</ortoepia_pb_dAO>
				<hif>pe.no</hif>
				<hif_dAO>pe.no</hif_dAO>
				<hif_dAO1>pe.no</hif_dAO1>
				<hif_pb>pe.no</hif_pb>
				<hif_pb_dAO>pe.no</hif_pb_dAO>
				<ordem>0</ordem>
				<definicao>
					<Categoria>adj. n. m.</Categoria>
					<Dominio></Dominio>
					<Definicao>Cartaginês.</Definicao>
					<ordem>0</ordem>
					<Categoria_ext_aAO>adjectivo e nome masculino</Categoria_ext_aAO>
					<Categoria_ext_dAO>adjetivo e nome masculino</Categoria_ext_dAO>
					<Categoria_pb>adj. s. m.</Categoria_pb>
					<Categoria_ext_pb>adjetivo e substantivo masculino</Categoria_ext_pb>
				</definicao>
			</verbete>
		</texto>
		<nome>dlpo</nome>
	</registo>
	<descritores regid="74279">
		<descritor tipo='0' count='0'>enop</descritor>
		<descritor tipo='0' count='0'>enop</descritor>
		<descritor tipo='0' count='0'>enop</descritor>
		<descritor tipo='0' count='0'>enop</descritor>
		<descritor tipo='0' count='0'>enop</descritor>
	</descritores>
	<organismos></organismos>
	<textos></textos>
	<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
	<registo>
		<id>79043</id>
		<datadoc>17-02-2021</datadoc>
		<datapub>17-02-2021</datapub>
		<dataalteracao>17-02-2021</dataalteracao>
		<titulo></titulo>
		<designacao>púnico</designacao>
		<fonte></fonte>
		<texto>
			<verbete verb_id="79043">
				<nome>púnico</nome>
				<etimologia>latim <i>Punicus, -a, -um</i>
				</etimologia>
				<estrangeirismo>0</estrangeirismo>
				<verbete_dAO>púnico</verbete_dAO>
				<verbete_dAO1>púnico</verbete_dAO1>
				<verbete_pb>púnico</verbete_pb>
				<verbete_pb_dAO>púnico</verbete_pb_dAO>
				<hif>pú.ni.co</hif>
				<hif_dAO>pú.ni.co</hif_dAO>
				<hif_dAO1>pú.ni.co</hif_dAO1>
				<hif_pb>pú.ni.co</hif_pb>
				<hif_pb_dAO>pú.ni.co</hif_pb_dAO>
				<ordem>0</ordem>
				<definicao>
					<Categoria>adj. n. m.</Categoria>
					<Dominio></Dominio>
					<Definicao>Pertencente ou relativo a Cartago ou o seu natural ou habitante.</Definicao>
					<sinonimos>cartaginês</sinonimos>
					<ordem>0</ordem>
					<Categoria_ext_aAO>adjectivo e nome masculino</Categoria_ext_aAO>
					<Categoria_ext_dAO>adjetivo e nome masculino</Categoria_ext_dAO>
					<Categoria_pb>adj. s. m.</Categoria_pb>
					<Categoria_ext_pb>adjetivo e substantivo masculino</Categoria_ext_pb>
				</definicao>
				<definicao>
					<Categoria></Categoria>
					<Dominio></Dominio>
					<Registo>Fig.</Registo>
					<Definicao>Que ou quem não diz a verdade ou não cumpre o que promete.</Definicao>
					<sinonimos>mentiroso, pérfido, traiçoeiro</sinonimos>
					<ordem>1</ordem>
					<Registo_ext_aAO>Figurado</Registo_ext_aAO>
					<Registo_pb>Fig.</Registo_pb>
					<Registo_ext_pb>Figurado</Registo_ext_pb>
				</definicao>
				<definicao>
					<Categoria>n. m.</Categoria>
					<Dominio></Dominio>
					<Definicao>Língua dos cartagineses.</Definicao>
					<sinonimos>cartaginês</sinonimos>
					<ordem>2</ordem>
					<Categoria_ext_aAO>nome masculino</Categoria_ext_aAO>
					<Categoria_pb>s. m.</Categoria_pb>
					<Categoria_ext_pb>substantivo masculino</Categoria_ext_pb>
				</definicao>
			</verbete>
		</texto>
		<nome>dlpo</nome>
	</registo>
	<descritores regid="79043">
		<descritor tipo='0' count='0'>cinopú</descritor>
		<descritor tipo='0' count='0'>cinopú</descritor>
		<descritor tipo='0' count='0'>cinopú</descritor>
		<descritor tipo='0' count='0'>cinopú</descritor>
		<descritor tipo='0' count='0'>cinopú</descritor>
	</descritores>
	<organismos></organismos>
	<textos></textos>
	<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
	<registo>
		<id>109957</id>
		<datadoc>17-02-2021</datadoc>
		<datapub>17-02-2021</datapub>
		<dataalteracao>17-02-2021</dataalteracao>
		<titulo></titulo>
		<designacao>eliseu</designacao>
		<fonte></fonte>
		<texto>
			<verbete verb_id="109957">
				<nome>eliseu</nome>
				<etimologia>latim <i>elissaeus, -a, -um</i>
				</etimologia>
				<estrangeirismo>0</estrangeirismo>
				<morfologia>Feminino: eliseia.</morfologia>
				<morfologia_pb>Feminino: <ac>
					<aAO>eliséia</aAO>
					<dAO>eliseia</dAO>
				</ac>.
			</morfologia_pb>
			<verbete_dAO>eliseu</verbete_dAO>
			<verbete_dAO1>eliseu</verbete_dAO1>
			<verbete_pb>eliseu</verbete_pb>
			<verbete_pb_dAO>eliseu</verbete_pb_dAO>
			<hif>e.li.seu</hif>
			<hif_dAO>e.li.seu</hif_dAO>
			<hif_dAO1>e.li.seu</hif_dAO1>
			<hif_pb>e.li.seu</hif_pb>
			<hif_pb_dAO>e.li.seu</hif_pb_dAO>
			<ordem>0</ordem>
			<definicao>
				<Categoria>adj. n. m.</Categoria>
				<Definicao>O mesmo que <i>
					<b>cartaginês</b>
				</i>.
			</Definicao>
			<ordem>0</ordem>
			<Categoria_ext_aAO>adjectivo e nome masculino</Categoria_ext_aAO>
			<Categoria_ext_dAO>adjetivo e nome masculino</Categoria_ext_dAO>
			<Categoria_pb>adj. s. m.</Categoria_pb>
			<Categoria_ext_pb>adjetivo e substantivo masculino</Categoria_ext_pb>
		</definicao>
	</verbete>
</texto>
<nome>dlpo</nome>
</registo>
<descritores regid="109957">
<descritor tipo='0' count='0'>eeilsu</descritor>
<descritor tipo='0' count='0'>eeilsu</descritor>
<descritor tipo='0' count='0'>eeilsu</descritor>
<descritor tipo='0' count='0'>eeilsu</descritor>
<descritor tipo='0' count='0'>eeilsu</descritor>
</descritores>
<organismos></organismos>
<textos></textos>
<base nome="dlpo" dll="LegixIsamLLDB" language="0"/>
<registo>
<id>109958</id>
<datadoc>17-02-2021</datadoc>
<datapub>17-02-2021</datapub>
<dataalteracao>17-02-2021</dataalteracao>
<titulo></titulo>
<designacao>elisseu</designacao>
<fonte></fonte>
<texto>
	<verbete verb_id="109958">
		<nome>elisseu</nome>
		<etimologia>latim <i>elissaeus, -a, -um</i>
		</etimologia>
		<estrangeirismo>0</estrangeirismo>
		<morfologia>Feminino: elisseia.</morfologia>
		<morfologia_pb>Feminino: <ac>
			<aAO>elisséia</aAO>
			<dAO>elisseia</dAO>
		</ac>.
	</morfologia_pb>
	<verbete_dAO>elisseu</verbete_dAO>
	<verbete_dAO1>elisseu</verbete_dAO1>
	<verbete_pb>elisseu</verbete_pb>
	<verbete_pb_dAO>elisseu</verbete_pb_dAO>
	<hif>e.lis.seu</hif>
	<hif_dAO>e.lis.seu</hif_dAO>
	<hif_dAO1>e.lis.seu</hif_dAO1>
	<hif_pb>e.lis.seu</hif_pb>
	<hif_pb_dAO>e.lis.seu</hif_pb_dAO>
	<ordem>0</ordem>
	<definicao>
		<Categoria>adj. n. m.</Categoria>
		<Definicao>O mesmo que <i>
			<b>cartaginês</b>
		</i>.
	</Definicao>
	<ordem>0</ordem>
	<Categoria_ext_aAO>adjectivo e nome masculino</Categoria_ext_aAO>
	<Categoria_ext_dAO>adjetivo e nome masculino</Categoria_ext_dAO>
	<Categoria_pb>adj. s. m.</Categoria_pb>
	<Categoria_ext_pb>adjetivo e substantivo masculino</Categoria_ext_pb>
</definicao>
</verbete>
</texto>
<nome>dlpo</nome>
</registo>
<descritores regid="109958">
<descritor tipo='0' count='0'>eeilssu</descritor>
<descritor tipo='0' count='0'>eeilssu</descritor>
<descritor tipo='0' count='0'>eeilssu</descritor>
<descritor tipo='0' count='0'>eeilssu</descritor>
<descritor tipo='0' count='0'>eeilssu</descritor>
</descritores>
<organismos></organismos>
<textos></textos>
</verbetes>
*/}

afterLoad(function() {
	let sr = `
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

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('POST', 'http://services.flip.pt/dlpo2transformsac/dlpo_format.asmx', true);
// 	xmlhttp.open('POST', 'http://services.priberam.pt/Pesquisa', true);
	xmlhttp.onreadystatechange = function () {
		alert(xmlhttp.status + " | " + xmlhttp.responseText + " | " + xmlhttp.responseXML);
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			alert(xmlhttp.responseText);
		}
	}
	
	// Send the POST request
// 	xmlhttp.setRequestHeader('Content-Type', 'text/xml');
	xmlhttp.setRequestHeader('User-Agent', 'sampleTest');
	xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');
	xmlhttp.send(sr);
	
	

// // create web audio api context
// var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

// function playNote(frequency, duration) {
//   // create Oscillator node
//   var oscillator = audioCtx.createOscillator();

//   oscillator.type = 'square';
//   oscillator.frequency.value = frequency; // value in hertz
//   oscillator.connect(audioCtx.destination);
//   oscillator.start();

//   setTimeout(
//     function() {
//       oscillator.stop();
//       playMelody();
//     }, duration);
// }

// function playMelody() {
//   if (notes.length > 0) {
//     note = notes.pop();
//     playNote(note[0], 1000 * 256 / (note[1] * tempo));
//   }
// }

// notes = [
//   [659, 4],
//   [659, 4],
//   [659, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4],
//   [0, 4],
//   [987, 4],
//   [987, 4],
//   [987, 4],
//   [1046, 8],
//   [0, 16],
//   [783, 16],
//   [622, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4]
// ];

// notes.reverse();
// tempo = 100;

// playMelody();

});
