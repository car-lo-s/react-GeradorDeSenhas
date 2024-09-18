import { useState } from "react";
import "./estilo.css";

function App() {
  const [senha, setSenha] = useState<string>("");
  const [tamanho, setTamanho] = useState<number>(15); 
  const [caixaAlta,setCaixaAlta] = useState<boolean>(false);
  const [caixaBaixa,setCaixaBaixa] = useState<boolean>(false);
  const [numero,setNumero] = useState<boolean>(false);
  const [simbolo,setSimbolo] = useState<boolean>(false);
  const [mensagemTemp,setMensagemTemp] = useState<boolean>(false)
  // const [modo,setModo] = useState<number>(1)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTamanho(parseInt(event.target.value));
    // console.log(tamanho);
  }

  function GerarSenhaAleatoria(){
    let codigo:string='';
    let i:number = 0;

    while(i<tamanho){
      const temp = Math.floor(Math.random()*(5-1)+1)
      if(caixaBaixa && temp == 1){
        codigo+=String.fromCharCode(Math.floor(Math.random()*(123-97)+97))
        i++
      }else if(caixaAlta && temp == 2){
        codigo+=String.fromCharCode(Math.floor(Math.random()*(91-65)+65))
        i++
      }else if(numero && temp == 3){
        codigo+=String.fromCharCode(Math.floor(Math.random()*(58-48)+48))
        i++
      }else if(simbolo && temp == 4){
        codigo+=String.fromCharCode(Math.floor(Math.random()*(48-33)+33))
        i++
      }
      
      if(!caixaBaixa && !caixaAlta && !numero && !simbolo){
        alert("Marque uma opção!");
        break
      }
    }
      // console.log(codigo)
      setSenha(codigo)
    
  }

  function msgConfirmacao(){
    if(senha){
      navigator.clipboard.writeText(senha)
      setMensagemTemp(true)
      setTimeout(() => {
        setMensagemTemp(false)
      }, 2000);
    }
  }
  


  return (
    <section className="tela">
      <section className="box">
        <h1>Gerador de Senhas</h1>
        <label htmlFor="senha">Senha Gerada</label>
        <div className="boxresultado">
          <input type="text" name="" id="" disabled value={senha} />
          <button onClick={msgConfirmacao}>Copiar</button>
        </div>
        <label htmlFor="comprimento">Comprimento da senha: {tamanho} </label>
        <div className="boxrange">
          <input
            type="range"
            name="comprimento"
            id=""
            min={0}
            max={50}
            value={tamanho}
            onChange={handleChange}
          />
        </div>
        <div className="boxradio">
        <div>
            <input type="checkbox" name="" id="" onChange={()=>{caixaBaixa?setCaixaBaixa(false):setCaixaBaixa(true)}}/> 
            <p>Incluir Minúsculas</p>
          </div>
          <div>
            <input type="checkbox" name="" id="" onChange={()=>{caixaAlta?setCaixaAlta(false):setCaixaAlta(true)}}/> 
            <p>Incluir Maíusculas</p>
          </div>
          
          <div>
            <input type="checkbox" name="" id="" onChange={()=>{numero?setNumero(false):setNumero(true)}}/> 
            <p>Incluir Números</p>
          </div>
          <div>
            <input type="checkbox" name="" id="" onChange={()=>{simbolo?setSimbolo(false):setSimbolo(true)}}/> 
            <p>Incluir Símbolos</p>
          </div>
        </div>
        <div className="btnResultado">
            <button onClick={()=>{GerarSenhaAleatoria()}} >Gerar Senha</button>
        </div>
      </section>
      <div className={mensagemTemp?'mensagem':'oculto'}>
        Senha copiada com sucesso!
      </div>
      <p className="assinatura">Carlos R.</p>
    </section>
  );
}

export default App;
