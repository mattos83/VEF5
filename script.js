/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
 // villa; 
 alert("Velkomin/n, markmiðið með leiknum er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.");
 // byrja á sönnum rökum
 let again = true;
 // spila aftur?
 do{
    play();
   let spil = confirm("Spila aftur?");
   if (spil == true){
       again = true;
   }
   else{ again = false}
 }while (again) {
     
 }
 
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
    // hvenar hefst leikur?
   const start = Date();
   // spila leik
   const right = ask();
   // hvenar endar leikur?
   const end = Date();
   // hvað tók þetta langan tíma?
   const diff = ( (Date.parse(end) - Date.parse(start))/1000 );
   
   const average = right/diff;
   alert(` Þú hafðir ${right} Rétt af ${GAMES_TO_PLAY} dæmum á ${diff.toFixed(2)} sekúntum.`);
   alert(`Meðalrétt svör: ${average.toFixed(2)} á sekúntu`);    
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
    
    let t = GAMES_TO_PLAY;
    // hveru oft er rétt 
    let rett = 0;
    do{
     // finn random tölur 
     const a = randomNumber(0, 100);    
     const b = randomNumber(0, 100);
           
    //kalla á dæmafallið sem velur dæmi og spyr um svar
    const rok = daemi(a,b);   
    
     if (rok == true) {
        rett++;        
     }    
      t-=1;
    }while(t > 0)
    const foo = rett;
    return foo;

}
/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Aðalfallið sem heldur utan um mismunandi dæma möguleika og spyr um svar og skilar svo hvort svar er rétt eða ekki.
function daemi(a,b){

    const r = randomNumber(1, 4);

    // hef opna input og d breytur fyrir svar notanda og rétt svar vegna fjölda möguleika    
    let input = 0;
    let d = 0;

    // nota switch vegna fjölda mismunandi dæma
    switch (r) {
        case 1: d = a+b;
                input = prompt(` ${a} + ${b} = `);            
            break;
        case 2: d = a-b;
                input = prompt(` ${a } - ${b} = `);
            break;
        case 3: d = a*b;
                input = prompt(` ${a} * ${b} = `);
            break;
        case 4: const n = randomNumber(2, 10);
                const m = randomNumber(2, 10);
                const c = n*m;       
                d = c/n;
                input = prompt(` ${c} /  ${n} = `);
            break;
        default:
                alert(`Villa`);
            break;
    }

    // parsa input og geri að tölu
    const parsedIn = parseInput(input);

    // er notandi með rétt svar?
    if (parsedIn === d){ 
        return true; 
    }// vill notandi hætta?
    else if (parsedIn === null) {
        const stop = confirm(`viltu hætta?`);
        if(stop == true){
            alert(`Jæja, bless þá!`);
            exit();
        }
    }
    else{ return false; }
}
// fall sem parsar frá streng í tugakerfi
function parseInput(input){ 
    const parsed = parseInt(input,10);

    if (isNaN(parsed)) {
        return null;
    }
    return parsed;
}
// Byrjar leik
start();