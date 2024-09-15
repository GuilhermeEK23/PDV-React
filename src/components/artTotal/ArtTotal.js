import './ArtTotal.css';

function ArtTotal(){
  return (
    <article className="artTotal">
      <div className='artTotal-content'>
        <section>
          <h1>TOTAL</h1>
        </section>
        <section>
          <h1>R$ <span>0,00</span></h1>
        </section>
      </div>
    </article>
  )
}

export default ArtTotal;