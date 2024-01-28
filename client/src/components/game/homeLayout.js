import React from 'react'

function homeLayout() {

    let crtTopCard = [];
   
    // const [crtTopCard, setPlayedCard] = useState([]);
    // const [gameCard, setGameCard] = useState([]);
  
    const [displayedCard, setDisplayedCard] = useState(null);
    const [userHand, setUserHand] = useState([]);
    const [compHand, setCompHand] = useState([]);
    const [availableCards, setAvailableCards] = useState([]);
    // const [discardPile, setDiscardPile] = useState([]);
    // const [userTurn, setUserTurn] = useState(false);
  
    useEffect(() => {
        axios.get('http://localhost:5555/deck')
          .then(response => {
            const deck = response.data.deck;
            setDisplayedCard(deck.pop()); // Set the displayed card from the top of the deck
            setUserHand([...deck.slice(0, 4)]); // Initial user hand (4 cards)
            setCompHand([...deck.slice(4, 8)]); // Initial comp hand (4 cards)
            setAvailableCards([...deck.slice(8)]); // Remaining cards for available cards
            
          })
          .catch(error => {
            console.error('Error fetching deck:', error);
          });
      }, []);

      // crtTopCard.unshift(displayedCard)
      // console.log(crtTopCard,"array of previous game cards")
        let newTopCard = [...crtTopCard,displayedCard]
        console.log(newTopCard,"array of previous  game-cards")
        const crtTopCrd = newTopCard[0]
     // const crtTopCrd = crtTopCard[0]
        console.log(crtTopCrd,'top card  || currently active game-card');


        const playCard = (card) => {
        const usrPlayedCrd = card
        console.log(usrPlayedCrd,'user-played card');
    
        if (usrPlayedCrd.rank === crtTopCrd.rank ||usrPlayedCrd.suit === crtTopCrd.suit ){
          
          setDisplayedCard(usrPlayedCrd);
          console.log("-------------------istep 1 setting display card===============")
          crtTopCard.push([usrPlayedCrd])
          console.log("-------------------istep 2   setting crtTopCard results below  ===============")
          console.log(displayedCard,"supposed active game-card to be  || usestate method -- setdisplay")
          console.log(crtTopCard,"new displayed card")
    
          const updatedUserHand = userHand.filter(card => card !== usrPlayedCrd);
          setUserHand(updatedUserHand);
          console.log("-------------------istep 4 updated userHand (no-of-cards - 1 )===============")
          setTimeout(checkForWinner,200);
          console.log("-------------------istep 5  checking penalty possibility===============")
          if (usrPlayedCrd.rank < 4) {
            handleeSpecialCardRulesUserHand(usrPlayedCrd);
            console.log("-------------------istep optn 5.1 penalty rules applied [user plays again] ===============")
          }else{
            //function for comp to play
            console.log("-------------------istep optn 5.2 penalty not applied ===============")
            console.log("its now ai`s turn") // Call the function for AI logic after a delay
            setTimeout(aiLogic,3000);
          }
          console.log("------------------- final istep [ user Logic]  ===============")
          
        }else{
         
          alert("Pick another card")
        }
        
      };

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