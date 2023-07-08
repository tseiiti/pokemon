require "savon"
# require "active_support"
# require "active_support/core_ext/"

require "net/http"

system("cls")

url = "http://services.flip.pt/dlpo2transformsac/dlpo_format.asmx?wsdl"
# env = '''
# <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://services.priberam.pt/">
#    <soap:Header/>
#    <soap:Body>
#       <ser:Define>
#          <ser:TextoAPesquisar>alvará</ser:TextoAPesquisar>
#          <ser:Modo>None</ser:Modo>
#          <ser:acordo>true</ser:acordo>
#          <ser:lid>1046</ser:lid>
#       </ser:Define>
#    </soap:Body>
# </soap:Envelope>
# '''

# client = Savon.client(wsdl: url)
# puts client.operations
# res = client.call(:define, xml: env).body[:define_response][:define_result]
# puts res
# puts Hash.from_xml(res).to_json


res = Net::HTTP.get_response(URI(url))
wsdl = Nokogiri::XML(res.body, nil, "utf-8") if res.is_a?(Net::HTTPSuccess)

wsdl.xpath("//wsdl:types/s:schema/s:element").each do |e|
	if e["name"].downcase == "define"
		puts e
	end
end


# res = "<verbetes><pesq>acto</pesq><base nome=\"dlpo\" dll=\"LegixIsamLLDB\" language=\"0\"/><registo><id>12848</id><datadoc>17-02-2021</datadoc><datapub>17-02-2021</datapub><dataalteracao>17-02-2021</dataalteracao><titulo></titulo><designacao>acto</designacao><fonte></fonte><texto><verbete verb_id=\"12848\"><nome>acto</nome><ortoepia>át</ortoepia><etimologia>latim <i>actus, -us</i>, movimento, impulso, empurrão, impetuosidade, direito de passagem, medida agrária</etimologia><estrangeirismo>0</estrangeirismo><verbete_dAO>ato</verbete_dAO><ortoepia_dAO>át</ortoepia_dAO><verbete_dAO1>ato</verbete_dAO1><ortoepia_dAO1>át</ortoepia_dAO1><verbete_pb>ato</verbete_pb><verbete_pb_dAO>ato</verbete_pb_dAO><ortoepia_pb>át</ortoepia_pb><ortoepia_pb_dAO>át</ortoepia_pb_dAO><hif>ac.to</hif><hif_dAO>a.to</hif_dAO><hif_dAO1>a.to</hif_dAO1><hif_pb>a.to</hif_pb><hif_pb_dAO>a.to</hif_pb_dAO><ordem>0</ordem><definicao><Categoria>n. m.</Categoria><Dominio></Dominio><Definicao><var><pt><ac><aAO>Acção</aAO><dAO>Ação</dAO></ac></pt><pb>Ação</pb></var> (feita ou por fazer) considerada <var><pt>na sua</pt><pb>em sua</pb></var> essência ou resultado.</Definicao><ordem>0</ordem><Categoria_ext_aAO>nome masculino</Categoria_ext_aAO><Categoria_pb>s. m.</Categoria_pb><Categoria_ext_pb>substantivo masculino</Categoria_ext_pb></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Registo>Por ext.</Registo><Definicao>Feito, <var><pt>facto</pt><pb>fato</pb></var>.</Definicao><ordem>1</ordem><Registo_ext_aAO>Por extensão</Registo_ext_aAO><Registo_pb>Por ext.</Registo_pb><Registo_ext_pb>Por extensão</Registo_ext_pb></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Definicao>Fórmula religiosa.</Definicao><ordem>2</ordem></definicao><definicao><Categoria></Categoria><Dominio>Teatro</Dominio><Definicao>Divisão principal das peças de teatro.</Definicao><ordem>3</ordem><Dominio_ext_aAO>Teatro</Dominio_ext_aAO><Dominio_pb>Teatro</Dominio_pb><Dominio_ext_pb>Teatro</Dominio_ext_pb></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Definicao>Prova universitária de fim de ano ou de curso.</Definicao><ordem>4</ordem></definicao><definicao><Categoria></Categoria><Dominio></Dominio><Registo>Reg.</Registo><Definicao>Representação teatral.</Definicao><sinonimos>auto</sinonimos><ordem>5</ordem><Registo_ext_aAO>Regionalismo</Registo_ext_aAO><Registo_pb>Reg.</Registo_pb><Registo_ext_pb>Regionalismo</Registo_ext_pb></definicao><definicao><Definicao>Logo a seguir.</Definicao><sinonimos>imediatamente</sinonimos><ordem>6</ordem><exemplo_locucao><var><pt><ac><aAO>acto</aAO><dAO>ato</dAO></ac></pt><pb>ato</pb></var> contínuo</exemplo_locucao><exemplo_locucao_num>1</exemplo_locucao_num><exemplo_locucao_txt>acto contínuo</exemplo_locucao_txt><exemplo_locucao_txt_dAO>ato contínuo</exemplo_locucao_txt_dAO><exemplo_locucao_txt_pb>ato contínuo</exemplo_locucao_txt_pb><exemplo_locucao_txt_pb_dAO>ato contínuo</exemplo_locucao_txt_pb_dAO></definicao><definicao><Dominio>Psican.</Dominio><Definicao>Engano verbal que pode revelar um conflito entre a intenção e o inconsciente.</Definicao><sinonimos>parapraxia, parapráxis</sinonimos><ordem>7</ordem><exemplo_locucao><var><pt><ac><aAO>acto</aAO><dAO>ato</dAO></ac></pt><pb>ato</pb></var> falhado</exemplo_locucao><exemplo_locucao_num>2</exemplo_locucao_num><Dominio_ext_aAO>Psicanálise</Dominio_ext_aAO><Dominio_pb>Psican.</Dominio_pb><Dominio_ext_pb>Psicanálise</Dominio_ext_pb><exemplo_locucao_txt>acto falhado</exemplo_locucao_txt><exemplo_locucao_txt_dAO>ato falhado</exemplo_locucao_txt_dAO><exemplo_locucao_txt_pb>ato falhado</exemplo_locucao_txt_pb><exemplo_locucao_txt_pb_dAO>ato falhado</exemplo_locucao_txt_pb_dAO></definicao><definicao><Dominio>Psican.</Dominio><Registo>Bras.</Registo><Definicao>O mesmo que <i><b><var><pt><ac><aAO>acto</aAO><dAO>ato</dAO></ac></pt><pb>ato</pb></var> falhado</b></i>.</Definicao><ordem>8</ordem><exemplo_locucao><var><pt><ac><aAO>acto</aAO><dAO>ato</dAO></ac></pt><pb>ato</pb></var> falho</exemplo_locucao><exemplo_locucao_num>3</exemplo_locucao_num><Dominio_ext_aAO>Psicanálise</Dominio_ext_aAO><Registo_ext_aAO>Brasil</Registo_ext_aAO><Dominio_pb>Psican.</Dominio_pb><Dominio_ext_pb>Psicanálise</Dominio_ext_pb><Registo_pb>Bras.</Registo_pb><Registo_ext_pb>Brasil</Registo_ext_pb><exemplo_locucao_txt>acto falho</exemplo_locucao_txt><exemplo_locucao_txt_dAO>ato falho</exemplo_locucao_txt_dAO><exemplo_locucao_txt_pb>ato falho</exemplo_locucao_txt_pb><exemplo_locucao_txt_pb_dAO>ato falho</exemplo_locucao_txt_pb_dAO></definicao></verbete></texto><nome>dlpo</nome></registo><descritores regid=\"12848\"><descritor tipo='0' count='0'>acot</descritor><descritor tipo='0' count='0'>aot</descritor><descritor tipo='0' count='0'>aot</descritor><descritor tipo='0' count='0'>aot</descritor><descritor tipo='0' count='0'>aot</descritor></descritores><organismos></organismos><textos></textos></verbetes>"

# doc = Nokogiri::XML(res, nil, "utf-8")
# doc.css("Definicao").each do |defin|
# 	defin.css("var").each do |var|
# 		var.content = var.css("pb").text
# 	end
# end

# puts doc.css("Definicao")