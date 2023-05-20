const main = document.querySelector("#mbti_main");
const qna = document.querySelector("#mbti_qna");
const result = document.querySelector("#mbti_result");
const mbtiEndPoint = 5;
const mbti_select = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0];

function calResult(){ //가장 많이 선택된 원두를 계산하여 출력.
    console.log(mbti_select);
        var resultArray = mbti_select.indexOf(Math.max(...mbti_select));
        return resultArray;
    }

function setResult(){
    let point = calResult();
    const resultName=document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImage');
    var imgURL = './img/image-' + point + '.jpg'; //img 폴더의 image- + point + .jpg
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultFlavor = document.querySelector('.resultFlavor');
    resultFlavor.innerHTML =  infoList[point].flavor[0]+'<br/>'+ infoList[point].flavor[1]+'<br/>'+infoList[point].flavor[2]+'<br/>'
    +infoList[point].flavor[3]+'<br/>'+infoList[point].flavor[4]+'<br/>';
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML =  infoList[point].desc[0]+'<br/>'+infoList[point].desc[1];
}

function goResult(){
    mbti_qna.style.WebkitAnimation = "fadeOut 1s";
    mbti_qna.style.Animation = "fadeOut 1s";

    setTimeout(() => {
        mbti_result.style.WebkitAnimation = "fadeIn 1s";
        mbti_result.style.Animation = "fadeIn 1s"; //qna의 내용이 꺼지고 애니메이션 진행
        setTimeout(() => {
            mbti_qna.style.display = "none"; //qna의 애니메이션이 끝나갈 쯤 내용을 비공개
            mbti_result.style.display = "block"; //qna가 비공개가 되면 result 등장
        }, 450)
    })
    setResult();
}
/*
function addAnswer(answerText, qIdx, idx){ //answerText 답변별 버튼을 만듦, idx:몇 번째 질문을 선택하는가에 대한 인덱스
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList'); //버튼들에게 answerList라는 이름의 클래스를 주었음.
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn'); //버튼을 클릭했을 때 fadeIn 효과.
 
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click",function(){ //버튼을 누르면 넘어가게 함
        var children = document.querySelectorAll('.answerList');  //children 변수에 해당 페이지의 모든 버튼을 담고, 다음 질문으로 넘어가면 전 질문의 버튼은 비활성화.
        for(let i=0; i< children.length; i++){
            children[i].disabled=true; //한 버튼을 누르면 다른 버튼이 disabled 상태가 된다.
            children[i].style.WebkitAnimation = "fadeOut 0.5s"; //버튼이 사라질 때 애니메이션 진행됨.
            children[i].Animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type; 
            for(let i = 0; i < target.length; i++){
                mbti_select[target[i]] += 1;
            } //select에 answer 받은 값 넣기. ex) select[0] = espresso(1번째 버튼)
            for(let i=0; i< children.length; i++){
                children[i].style.display='none';
            }
            goNext(++qIdx); // qIdx : 1을 증가시켜 다음 질문을 출력
        },450)
    }, false); 
}*/

function goNext(qIdx, idx){ //다음 질문 출력
    if(qIdx === mbtiEndPoint){
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    var status = document.querySelector('.statusBar'); //진행바 구현
    status.style.width = (100/mbtiEndPoint) * (qIdx) + '%'; /*qIdx는 0부터 시작하므로*/
    
    let qnaURL = "./img/question/";
    let leftMbtiURL = qnaURL + qIdx + '-A.png';
    let rightMbtitURL = qnaURL + qIdx + '-B.png';
    
    let leftMbtiImage =document.querySelector('.leftMbtiImage');
    let rightMbtiImage =document.querySelector('.rightMbtiImage');

    leftMbtiImage.src = leftMbtiURL;
    rightMbtiImage.src = rightMbtitURL;

    leftMbtiImage.style.display='block';
    rightMbtiImage.style.display= 'block';

    leftMbtiImage.classList.remove('fadeOut');
    rightMbtiImage.classList.remove('fadeOut');

    leftMbtiImage.classList.add('fadeIn');
    leftMbtiImage.classList.add('fadeIn');

    leftMbtiImage.addEventListener("click", function(){
        imageNext(qIdx, 0)
    }, false);
    rightMbtiImage.addEventListener("click", function(){
        imageNext(qIdx, 1)
    }, false);
}
    
function imageNext(qIdx, idx){
    let leftMbtiImage =document.querySelector('.leftMbtiImage');
    let rightMbtiImage =document.querySelector('.rightMbtiImage');

    leftMbtiImage.disabled=true; //한 버튼을 누르면 다른 버튼이 disabled 상태가 된다.
    leftMbtiImage.classList.remove('fadeIn');
    leftMbtiImage.classList.add('fadeOut');//버튼이 사라질 때 애니메이션 진행됨.

    rightMbtiImage.disabled=true; //한 버튼을 누르면 다른 버튼이 disabled 상태가 된다.
    leftMbtiImage.classList.remove('fadeIn');
    rightMbtiImage.classList.add('fadeOut') //버튼이 사라질 때 애니메이션 진행됨.
    
    setTimeout(() => {
        if(qIdx+1 === mbtiEndPoint){
            goResult();
            return;
        }
        else{
            setTimeout(()=>{
                var target = qnaList[qIdx].a[idx].type; 
                for(let i = 0; i < target.length; i++){
                    mbti_select[target[i]] += 1;
                    } //select에 answer 받은 값 넣기. ex) select[0] = espresso(1번째 버튼)

                leftMbtiImage.style.display='none';
                rightMbtiImage.style.display='none';
                goNext(++qIdx); // qIdx : 1을 증가시켜 다음 질문을 출력
            },450)
        }
    }, 450)
}

   
    /*
    for(let i in qnaList[qIdx].a){//[qIdx].a = 해당 질문의 답변을 가진 배열을 가리킴
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i); //a[i].answer = 답변을 가리킴. ex) 아메리카노
    }*/
    
function begin(){
    mbti_main.style.WebkitAnimation = "fadeOut 1s";
    mbti_main.style.Animation = "fadeOut 1s";

    setTimeout(() => {
        mbti_qna.style.WebkitAnimation = "fadeIn 1s";
        mbti_qna.style.Animation = "fadeIn 1s"; //메인의 내용이 꺼지고 애니메이션 진행
        setTimeout(() => {
            mbti_main.style.display = "none"; //메인의 애니메이션이 끝나갈 쯤 내용을 비공개
            mbti_qna.style.display = "block"; //메인이 비공개가 되면 qna 등장
        }, 450)
        let qIdx = 0; //질문의 인덱스
        goNext(qIdx);
    }, 450);
}
