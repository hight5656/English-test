let countTrue = 0;
let countFalse = 0;
let num = 0;

let userName = prompt('Enter your name');
if (userName === null || userName.trim() === '') {
    userName = 'Player';
}
$('#user-name').text(userName);

const easy = {
    question: ['snow', 'red', 'stone', 'tree', 'sky', 'ocean', 'mountain', 'flower', 'fire', 'book', 'sun', 'moon', 'star', 'cloud', 'wind'],
    answer: ['сніг', 'червоний', 'каміння', 'дерево', 'небо', 'океан', 'гора', 'квітка', 'вогонь', 'книга', 'сонце', 'місяць', 'зірка', 'хмара', 'вітер'],
};

const normal = {
    question: ['blizzard', 'crimson', 'boulder', 'foliage', 'firmament', 'abyss', 'summit', 'blossom', 'inferno', 'volume', 'luminary', 'lunar', 'celestial body', 'cumulus', 'zephyr'],
    answer: ['заметіль', 'пурпурний', 'валун', 'листва', 'небесний світ', 'бездна', 'вершина', 'квітка', 'вогонь', 'твір', 'світильник', 'лунний', 'небесне тіло', 'кучерявий', 'легкий вітер'],
};

const hard = {
    question: ['quintessence', 'vermilion', 'monolith', 'foliation', 'firmament', 'abyssal depth', 'pinnacle', 'efflorescence', 'conflagration', 'opus', 'luminescence', 'lunar', 'celestial entity', 'cumulonimbus', 'zephyrous'],
    answer: ['квінтесенція', 'багряний', 'моноліт', 'листування', 'небесний світ', 'бездонна глибина', 'вершина', 'розквітання', 'вогонь', 'твір', 'світіння', 'лунний', "небесний об'єкт", 'кумулонімб', 'зефірний'],
};

let startSize = easy.question.length;
let rand;
let temp

$('#number').text(`${startSize}/0`);
$('#button-addon2').click(() => alert('Choice difficulty '));
$('#easy').click(() => {
    resetProgress()
    startSize = easy.question.length;
    rand = generateRandomIndex(easy.question);
    $('#question').text(easy.question[rand])
    temp = { ...easy }
    
    $('#button-addon2').off('click');
    $('#button-addon2').click(() => test(temp))
});

$('#normal').click(() => {
    resetProgress()
    startSize = normal.question.length;
    rand = generateRandomIndex(normal.question);
    $('#question').text(normal.question[rand])
    temp = { ...normal }

    $('#button-addon2').off('click');
    $('#button-addon2').click(() => test(temp))
});

$('#hard').click(() => {
    resetProgress()
    $('#number').text(`${startSize}/${num}`)
    $('#score').text(`True:${countTrue} False:${countFalse}`)

    startSize = hard.question.length;
    rand = generateRandomIndex(hard.question);
    $('#question').text(hard.question[rand])
    temp = { ...hard }

    $('#button-addon2').off('click');
    $('#button-addon2').click(() => test(temp))
});

function resetProgress() {
    countTrue = 0
    countFalse = 0
    num = 0

    $('#number').text(`${startSize}/${num}`)
    $('#score').text(`True:${countTrue} False:${countFalse}`)
}

function generateRandomIndex(array) {
    return parseInt(Math.random() * array.length);
}

function test(questionAndAnswer) {
    const userAnswer = String($('#answer').val()).trim().toLowerCase()
    const correctAnswer = questionAndAnswer.answer[rand].toLowerCase()

    if (userAnswer === correctAnswer) {
        countTrue++
        num++
        let temp = {
            question: [],
            answer: [],
        }

        let i = 0
        let delElement
        for (let item of questionAndAnswer.answer) {
            if (correctAnswer !== item) {
                temp.answer[i++] = item
            } else {
                delElement = i
            }
        }

        i = 0
        for (let j = 0; j < questionAndAnswer.question.length; j++) {
            if (j !== delElement) {
                temp.question[i++] = questionAndAnswer.question[j]
            }
        }
        questionAndAnswer.question = temp.question
        questionAndAnswer.answer = temp.answer
    } else {
        alert('Wrong answer')
        countFalse++
    }
    $('#answer').val('')

    $('#number').text(`${startSize}/${num}`)
    $('#score').text(`True:${countTrue} False:${countFalse}`)

    if (questionAndAnswer.question.length === 0) {
        $('#question').text(`Test over`);
        const levelMessage =
            countFalse === 0 ? 'Your level of English is very good' :
            countFalse < 6 ? 'Your level of English is good' :
            countFalse < 11 ? 'Your level of English is bad' :
            'Your level of English is very bad';
        alert(levelMessage);
    } else {
        rand = Math.floor(Math.random() * questionAndAnswer.question.length);
        $('#question').text(questionAndAnswer.question[rand]);
    }
}
