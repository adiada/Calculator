'use strict'
//alert("Hi this is an alert!!!");

function getHistory(){
    return document.getElementById("history-value").innerText;
}

// alert(getHistory());

function printHistory(num){
    document.getElementById('history-value').innerText = num;
}

//printHistory('5*5+6');

function getOutput(){
    return document.getElementById('output-value').innerText;
}

function printOutput(num){
    if(num === ''){
        document.getElementById('output-value').innerText = num;
    }
    else{
        document.getElementById('output-value').innerText = getFormattedNumber(num);
    } 
}

function getFormattedNumber(num){
    //if the number faces the negative sign
    if(num === '-'){
        console.log('neg:' + num);
        return ''; 
    }
    var n =  Number(num);
    var retVal = n.toLocaleString("en-IN");
    return retVal;
}

//printOutput(760098895);

function reverseNumberFormat(n){
    return Number(n.replace(/\,/g,''));

}

var operator = document.getElementsByClassName('operator');

for( var i = 0 ; i < operator.length ; i++){
    operator[i].addEventListener('click',function(){
        //alert("The operator clicked:"+this.id);
        if(this.id === 'clear'){
            printHistory('');
            printOutput('');
        }
        else if(this.id === 'backspace'){
            let output = String(reverseNumberFormat(getOutput()));
            if(output){
                output = output.substr(0,output.length - 1);
                printOutput(output);
            }
        }
        else{
            var output = getOutput();
            var history = getHistory();
            if(output == '' && history != ''){     //case when operator swtich happens
                if(isNaN(history[history.length - 1])){
                    history = history.substr(0, history.length - 1);
                }    
            }
            if(output != '' || history != ''){ 
                console.log('check 3:'+this.id);     
                output = output == ''? output : reverseNumberFormat(output);
                history = history + output;
                //if(history === '' && output != '')
                if(this.id === '='){
                    var result = eval(history);
                    printOutput(result);
                    printHistory('');
                }
                else{
                    console.log('check 4:'+this.id);
                    history = history + this.id;
                    printHistory(history);
                    printOutput('');
                }
            }
        }
    });
}

var number = document.getElementsByClassName('number');

for( var i = 0 ; i < number.length ; i++){
    number[i].addEventListener('click',function(){
        //alert("The number clicked:"+this.id);

        var output = reverseNumberFormat(getOutput());
        if(output!=NaN){
            output = output + this.id;
            printOutput(output);
        }
    });
}