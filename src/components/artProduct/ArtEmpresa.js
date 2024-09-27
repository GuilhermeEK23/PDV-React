import './ArtEmpresa.css';
import logo_empresa from '../../assets/logo.png';

function ArtEmpresa(){
  return (
    <article className="artEmpresa">
      <div className='logoEmpresa'>
        <img src={logo_empresa} alt="logo empresa" />
      </div>
    </article>
  )
}

export default ArtEmpresa;