require "savon"

system("cls")

url = "http://services.flip.pt/dlpo2transformsac/dlpo_format.asmx?wsdl"
env = '''
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://services.priberam.pt/">
   <soap:Header/>
   <soap:Body>
      <ser:Define>
         <ser:TextoAPesquisar>acto</ser:TextoAPesquisar>
         <ser:Modo>None</ser:Modo>
         <ser:acordo>true</ser:acordo>
         <ser:lid>1046</ser:lid>
      </ser:Define>
   </soap:Body>
</soap:Envelope>
'''

client = Savon.client(wsdl: url)
res = client.call(:define, xml: env).body[:define_response][:define_result]
puts res