function hexToRGBA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 0xff, (c >> 8) & 0xff, c & 0xff].join(',') + ',' + alpha + ')';
    }
    return 'rgba(0,0,0,1)';
}
function getRGBAValues(string) {
    let cleaned = string.substring(string.indexOf('(') + 1, string.length -1);
    let split = cleaned.split(',');
    let intValues = [];
    for (let index in split) {
        intValues.push(parseInt(split[index]));
    }
    return intValues;
    }

    function randomColor() {
        let hexString = '0123456789abcdef';
        let hexCode = '#';
        for (let i = 0; i < 6; i++) {
            hexCode += hexString[Math.floor(Math.random() * hexString.length)];
        }
        return hexCode;
    }
    function shuffle(array) {
        for (let i = array.length - 1; i >=0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

function saveProgress() {
    let score = Number(localStorage.getItem('progress')) ?? 0;
    ++score;
    localStorage.setItem('progress', score);

}

    function checkWin() {
                
       let palleteSortChildrens = document.querySelector('.palette_sort').children;
       let WinCombination = [];
       console.log(palleteSortChildrens);
       for (let i = 0; i < palleteSortChildrens.length; i++) {
           WinCombination.push(palleteSortChildrens[i].dataset.id);
            console.log(WinCombination);
       }

       return WinCombination.toString() == ['0', '1', '2', '3', '4'].toString();
    
     }

     

    function createParticle(partColor) {
        const item = document.createElement('div');
        item.className = 'palette_particle';
        item.style.backgroundColor = partColor.rgba;
        item.dataset.id = partColor.id;
        item.dataset.pos = partColor.pos;
        item.addEventListener('click', function(e) {
            if (e.target.dataset.pos == 'out') {
            document.querySelector('.palette_sort').appendChild(e.target);
            e.target.dataset.pos = 'in';  }
            else   {
                document.querySelector('.palette_unsort').appendChild(e.target);
                e.target.dataset.pos = 'out';
                
            }

         if (checkWin()) {
             saveProgress();
            document.querySelector('.score').textContent = 'Очки: ' + Number(localStorage.getItem('progress'));
            setTimeout(() => {
                alert('Вы выиграли!');
                window.location.reload();
                      
                
            }, 20);

         }
            
            
        })


        return item;
    }




    let rgbaValues = getRGBAValues(hexToRGBA(randomColor(), 1.0));
    let paletteParticles = [];
    let alphaChannel = 0.0;
    for (let i = 0; i < 5; i++) {
        paletteParticles.push({
            id: i,
            rgba: 'rgba(' + rgbaValues[0] + ',' + rgbaValues[1] + ',' + rgbaValues[2] + ',' + (rgbaValues[3] - alphaChannel).toFixed(1) + ')',
            pos: 'out'
            
        });
        alphaChannel += 0.2
    }
    shuffle(paletteParticles);
    console.log(paletteParticles);
    for (let j= paletteParticles.length-1; j >= 0; j--) {
        document.querySelector('.palette_unsort').appendChild(createParticle(paletteParticles[j]));
        document.querySelector('.score').textContent = 'Очки: ' + Number(localStorage.getItem('progress'));
    }

    