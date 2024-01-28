import React from 'react'

function homeLayout() {
  return (
    <div className='homeLayout-crd'>
    <NavBar  /* ----------------------------add username as prop from Cookie  -----------------*/ />  
    <NavCenter  /*-----------------------   add games won Prop for Running   -----------------------------------*/ />
    
    <div className='crd-wrap'/*-------  User Cards Section  ---------*/>
      <div className='userDec-crd'>
      <h2>Your Hand</h2>
      
        <div className='userDec-crrd'>
          {userHand.map((card, index) => (
            <div  className='playCardDec-crd' key={index} onClick={() => playCard(card)}>
              <p>{card.rank} </p> 
              <p>*{card.suit}* </p>
            </div>
          ))}
        </div>
      
   </div>
      <div className='crd-shell'>
          <div className='cardDec-crd'  onClick={handlePickCard}/*-------  Pick Cards Section  ---------*/ > 
          <h2>Pick Card</h2>
          </div>

          <div className='gamedec-crd' /*-------  Game Table Section  ---------*/>
            <p>Game Table </p>
              <div className='crdd-wrp'>
              
              
              <div className='crd-crd'/*-------  Game Card Section  ---------*/>
              {displayedCard && (
                <div>
                  <h2>Game Card</h2>
                  <p>{displayedCard.rank} </p>
                  <p> **{displayedCard.suit}**</p>
                </div>
              )}
              </div>
      
              </div>
          </div>
      </div>
      <div className='pcDec-crd' /*-------  pc Cards Section  ---------*/>
        <h2>pc Cards</h2>
        
          <div className='userDec-crrd'>
            
            {compHand.map((card, index) => (
              <div  className='playCardDec-crd' key={index} onClick={() => playCard(index)}>
                
              <p>*** </p> 
              <p>***** </p>
                
              </div>
            ))}
          </div>
       
      </div>
    </div>
    <div className='btn'>
      <button>Quit Game</button>
    </div>
  </div>
  )
}

export default homeLayout