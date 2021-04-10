const startingMinutes = 1.5;

var time = startingMinutes * 60;

let timer;

let startGameTime;

let endGameTime;

var countdownEl;

var timerInterval;

var forCamp = 0

var forMe = 0

var duckStolen = 0;

var foxShot = 0;

var foxAppearTime;

var isFoxCreated = false;

var foxIdNumber = 0

class DeadDuck {
    constructor(posX, id) {
        this.posX = posX
        this.id = id
    }
};

class Fox {
    constructor(id){
        this.speed = 0.1
        this.speedF = -150
        this.id = id
        this.getTime = Math.round(new Date() /1000)
        this.spriteFox
        this.rect
        
    }


    createFox() {
        var fox = document.createElement("div")
        fox.id = `fox-${this.id}`
        fox.classList.add("fox")
        document.getElementById("map").appendChild(fox)
        // fox.style.transform = ('scale(-1,1)')
        this.spriteFox = document.getElementById(`fox-${this.id}`)
        // this.spriteFox.style.left = window.innerWidth/2 + "px"
        // this.spriteFox.style.bottom = document.getElementById("bottom-menu").clientHeight + "px"
        // this.spriteFox.style.left = -300 + "px"
    }
    moveFox(){
        var x = document.getElementById("foxMove")
        x.play()
        if(document.getElementsByClassName('fox').length > 0) {
        var curTime = Math.round(new Date() /1000)
        if(curTime - this.getTime > 0.8) {

            var a = window.innerWidth/100
            this.speedF = this.speedF + a*this.speed
            this.spriteFox.style.left = this.speedF + "px"
            this.rect = document.getElementById(`fox-${this.id}`).getBoundingClientRect()
            if(this.rect.right >= window.innerWidth - 10){
                // foxArr.pop()
                foxIdNumber += 1
                isFoxCreated= false
                
                this.removeFox()
                var x = document.getElementById("foxMove")
                x.pause()
                
            }
            for (var i in dead_duck_arr) {
                if (this.rect.right >= dead_duck_arr[i].posX && this.rect.right <= dead_duck_arr[i].posX + 5) {
                    duckStolen += 1
                    document.getElementById("stolen_score_num").innerHTML = `${duckStolen}`
                    var x = document.getElementById("eat")
                    x.play()
                    // setTimeout(function(){
                    //     x.pause()
                    // }, 700)
          
                    if (i == 0) {
                        // console.log(1)
                        dead_duck_arr = dead_duck_arr.slice(1,dead_duck_arr.length)
                        console.log("duck_eaten")
                        break
                    } else if (i == dead_duck_arr.length - 1) {
                        // console.log(2)
                        dead_duck_arr = dead_duck_arr.slice(0, dead_duck_arr.length-1)
                        console.log("duck_eaten")
                        break
                    } else {
                        var count = Number(i)
                    
                        // console.log(duck_arr.slice(0,v).concat(duck_arr.slice(v+1)))
                        
                        dead_duck_arr = dead_duck_arr.slice(0,count).concat(dead_duck_arr.slice(count+1))
                        console.log("duck_eaten")
                        // console.log(v,a, b)
                        break
                    }
                    
                    // console.log("duck_eaten")
                }
            }
            // console.log(this.rect.right, window.innerWidth)
        }
        }
    }
    shotFox() {
        console.log("here-", this.rect)
        var checkFox = document.getElementById(`fox-${this.id}`)
        var aim = document.getElementById("target").getBoundingClientRect()
        if ( checkFox != null) {
            if (aim.top + 35  > this.rect.top && aim.top + 35 < this.rect.bottom && aim.left + 35 > this.rect.left && aim.left + 35 < this.rect.right && bullets_in_gun >= 0 ) {
                foxShot += 1
                document.getElementById("fox_score_num").innerHTML = `${foxShot}`
                foxIdNumber += 1
                isFoxCreated= false
                
                this.removeFox()
            }
        }
        
    }
    removeFox() {
        document.getElementById(`fox-${this.id}`).remove()
    }
    
};

//-------------------------------------------------------------------------//

var myGame;

var myVar;

var text_intro = [
    "К счастью, большинство членов команды выжило. Остальным повезло меньше.",
    "3 дня вы ждали пока вас спасут, но никто так и не пришел.",
    "Вы, как глава этой экспедиции, должны решить, что вам делать дальше.",
    "Понимаю, мы попали не в самое лучшее положение.", // Сенку
    "Не в самое лучшее ? Нас совсем не ищут.", // Ген
    "Понимаю, ситуация кажется безвыходной, но я уверен, что наши поиски идут полным ходом. <br /> Вот только ...", // Сенку
    "Только что ?", // Ген
    "Ищут нас совсем в другом месте...",
    "И сколько мы должны ждать ?", // кинро
    "Дай подумать. Если учесть скорость самолета, высоту полета, а также время когда оборвалась связь со штабом. <br / > Также нужно учитывать какую площадь поиска придется охватить спасательному отряду...", // сенку
    "........", // кинро
    "Примерно 5 недель.", // Сенку 
    "И что же нам теперь делать ?", // Гинро
    "Все что нам осталось, выжить. Для начала проверим осталась ли еда в самолете.",
    "Уже проверили, почти все продукты сгорели, а то что осталось уже съели. Люди начинают нервничать.",
    "Плохо. Осталось что нибудь полезное ?",
    "Да, оружие, патроны и немного материалов.",
    "Этого достаточно",
    "Для того, чтобы выжить нам всем нужно работать слаженно.",
    "Основной вопрос выживания - это еда.",
    "Для осуществления плана, потребуется четыре человека",
    "Ген, Кинро, Гинро, вы подходите иделально",
    "Можно поподробнее ?",
    "Разумеется.", 
    "Во-первых - охота. В этой местности в основном водятся птицы, на них мы и будем охотиться. Если быть точнее, то я.",
    "Но один с охотой я не справлюсь. Мне нужен человек, который сможет быстро подобрать сбитых птиц, пока не появились хищники.",
    "Во-вторых - разведка. На одной охоте спастись мы не сможем, нужен тот, кто сможет разведать местность вокруг и добыть, что ниубдь ценное.",
    "И, наконец, в-третьих - лагерь. Нужен человек, который будет следить за обстоновкой в лагере, а также ухаживать за больными.", 
    "Все ясно? Тогда начинаем."
]
var num_of_text_intro = 0;
//-------------------------------------------------------------------------//
let gameMap = `<section id="map">
<div id="timer">
    1: 30
</div>
<div class="time_score" id="goose">
    <img src="img/duck_tutorial.png" id="duck_score_image">
    <span> : </span>
    <span id="duck_score_num"> 0 </span>
    <span> (<span id="got_duck_score_num">0</span>) </span>
</div>
<div class="time_score" id="wolfs">
    <img src="img/fox_tutorial.png" id="fox_score_image">
    <span> : </span>
    <span id="fox_score_num">0</span>
    <span> (<span id="stolen_score_num">0</span>) </span>
</div>
<div id="grass"></div>
</section>
<section id="bottom-menu">
<audio id ="myAudio" src="Duck-quack.mp3" loop="loop"></audio>
<audio id ="shot" src="shot.mp3"></audio>
<audio id = "emptygun" src="emptygun.mp3"> </audio>
<audio id = "foxMove" src = "fox.mp3"> </audio>
<audio id = "eat" src = "eat2.mp3"> </audio>
<div class="gun-property">
    <img src="img/guns/pistol/colt.png" class="game_gun_image">
    <div class="game_gun_property">
        <div>Accuracy: <span id="game_gun_accuracy"></span></div>
        <div>Number of bullets: <span id="game_gun_num_of_bullets"></span></div>
    </div>
</div>
<div class="ammo">
    <ul class="all_bullets_image">
        
    </ul>
    <div class="self_hunger">Hunger: <span id="hunger_level"></span></div>
</div>
<div class="friend">
    <img src="img/partners/kinro.png" class="friend_photo">
    <div class="friend-desk">
        <ul class="friend-proerty">
            <li>Partner: <span id="partner_name">Кинро</span></li>
            <li>Fatigue: <span id="partner_fatigue">12</span></li>
            <li class="get-duck">
                <button class="press">G</button>
                <div id="get-duck_row">
                    <div id="get-duck_move">
                        
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</section>`;

let mainMenu = `<div class="main-menu">
<div class="start-menu">
    <button class="start-button new-game marked">New Game</button>
    <button class="start-button score-board">Score Board</button>
</div>
<div class="overlay"></div>
</div>`;

let intro_0_level = `<div id="intro-scene">
<div class="story-tell">
    Эта история началась с того, что самолет вашей команды потерпел крушение.
</div>
<div id="skip" class="nav-buttons"><div>Press Q to skip</div></div>
<div id="next-slide" class="nav-buttons">Press &#8594; to next</div>
</div>`;

let introDisplay = `<div class="intro_menu" id="idCheck">
            
<div class="overlay"></div>
</div>
<div id="first_speaker">
<img src="img/history/senku.png" class="speaker_image">
</div>
<div id="second_speaker">
<img class="speaker_image">
</div>
<div id="dialogue">
<div id="speaker-name"></div>
<span id="speaker-text"></span>
</div>
<div id="skip" class="nav-buttons"><div>Press Q to skip</div></div>
<div id="next-slide" class="nav-buttons">Press &#8594; to next</div>
`;

let prepareMap = `<div class="choose_map">
<div id="choose_weapon" class="choose_menu choose_mark">
    <!-- <div id="choose_weapon_text"></div> -->
    <img src="img/partners/arrow.png" class="arrow_switch">
    <img id="choose_weapon_image" src="img/guns/pistol/colt.png">
    <img id="choose_weapon_image_aim" src="img/guns/pistol/colt_aim.png">
    <div id="choose_weapon_accuracy">Точность: 20%</div>
    <div id="choose_weapon_num_of_bullets">Количество патронов: 25</div>
    <div class="choose_block_name">Выберите оружие</div>
    <img src="img/partners/arrow.png" class="arrow_switch arrow_right">
</div>
<div id="choose_hunt" class="choose_menu">
    <div class="choose_block_title">Охота:</div>
    <img src="img/partners/arrow.png" class="arrow_switch">
    <img class="choose_partner_image gen_partner" src="img/partners/gen.png">
    <div class="choose_block_benefit">Польза: Хорошо</div>
    <img src="img/partners/arrow.png" class="arrow_switch arrow_right">
</div>

<div id="choose_scout" class="choose_menu">
    <div class="choose_block_title">Разведка:</div>
    <img src="img/partners/arrow.png" class="arrow_switch">
    <img class="choose_partner_image ginro_partner" src="img/partners/ginro.png">
    <div class="choose_block_benefit">Польза: Плохо</div>
    <img src="img/partners/arrow.png" class="arrow_switch arrow_right">
</div>
<div id="choose_camp" class="choose_menu">
    <div class="choose_block_title">Лагерь:</div>
    <img src="img/partners/arrow.png" class="arrow_switch">
    <img class="choose_partner_image kinro_partner" src="img/partners/kinro.png">
    <div class="choose_block_benefit">Польза: Отлично</div>
    <img src="img/partners/arrow.png" class="arrow_switch arrow_right">
</div>
<div id="choose_submit" class="choose_menu">Press "Enter" to start hunt</div>
</div>`;

let manageFinalScore = `<div class="score_map">
<div class="choose_menu_score">
    <span style="font-size: 3vh;"><b>Итоги: <span id="level_week"></span></b></span>
    <span>Очки за сбитых уток: 10 х <span id="score_ds"></span> = <span id="score_ds_final"></span></span>
    <span>Очки за принесеных уток: 20 х <span id="score_dg"></span> = <span id="score_dg_final"></span></span>
    <span>Очки за сбитых лис: 5 х <span id="score_fs"></span> = <span id="score_fs_final"></span></span>
    <span>Очки за украденных уток: -7 х <span id="score_dl"></span> = <span id="score_dl_final"></span></span>
    <span>Очки за сэкономленные патроны: 15 х <span id="score_bs"></span> = <span id="score_bs_final"></span></span>
    <span> Общий счет: <span id="score_all_final"> </span><span id="score_all_games_passed"></span></span>
    <div class="get_loot">
        <div id="loot_root" style="font-style: italic;" ></div>
    </div>
    <span style="font-style: italic;">Уровень недовольства в лагере: <span id="anger_level_final"></span></span>
</div>

<div id="manage_tool_bar" class="confirm_manage_menu choose_manage_mark">
    <div class="manage_tool">
        <span style="text-decoration: underline;">Мне</span>
        <span id="duck_for_me">0</span>
        <span id="duck_for_me_in_percent"></span>
    </div>

    <img src="img/partners/arrow.png" class="arrow_switch">
        <img src="img/dead.png" class="dead_duck_image">
    <img src="img/partners/arrow.png" class="arrow_switch arrow_right">
    <div class="manage_tool">
        <span style="text-decoration: underline;">Лагерю</span>
        <span id="duck_for_camp">0</span>
        <span id="duck_for_camp_in_percent"></span>
    </div>
    <div class="left_manage_explain explain_manage_menu">
        <ul>
            <li>Если оставить добычу себе, уровень голода уменьшится</li>
            <li>(Голод: состояние при котором скорость реакции уменьшается и, как следствие, скорость прицеливания)</li>
            <li>Если уровень голода достигнет 100% вы <span style="color: red; text-transform: capitalize;">Проиграете</span></li>
        </ul>
    </div>
    <div class="right_manage_explain explain_manage_menu">
        <ul>
            <li>Если оставить добычу лагерю, уровень недовольства уменьшится</li>
            <li>Если уровень недовольства достигнет 100% вы <span style="color: red; text-transform: capitalize;">Проиграете</span></li>
        </ul>
    </div>
</div>

<div id="choose_manage_submit" class="confirm_manage_menu">Press "Enter" to continue</div>
</div>`;

let tutorialMap = `<div id="tutorialMap">
<img src="img/tutorialMapS.png" id="tutorialImg">
</div>
<div id="next-slide-tutorial" class="nav-buttons">Press &#8594; to next</div>`;

let gameEndMap = `<div id="endGameMap">
<div id="endText">
    <span>Поздравляю! Вы смогли выжить и спасти лагерь</span>
</div>
<div class="overlay"></div>
</div>
<div id="next-slide" class="nav-buttons">Press &#8594; to next</div>`

let finalScoreGameMap = `<div id="final_game_end" class="score_map">
<div class="choose_menu_score">
    <span>Имя игрока: <span id="playerName">Батыр</span></span>
    <span>Итоговый счет: <span id="total_final_score">0</span></span>
    <span>Время в игре: <span id="total_final_time">0</span></span>
    <span>Уровень голода игрока: <span id="total_final_selfHunger">0</span></span>
    <span>Уровень голода в лагере: <span id="total_final_campHunger">0</span></span>
</div>

<div id="back_to_mm" class="confirm_manage_menu final_score_menu">Press "Enter" to return to "Main menu"</div>
</div>`

let level = 999;

let introMenu = false;

let manageMenu = false;

let gameMenu = false;

let scoreMenu = false; 

let isPaused = false;

let playGame;

let playerName;

let startTime;

const guns = {
    pistol: {
        colt: {
            aim: "img/guns/pistol/colt_aim.png",
            bullet: "img/guns/pistol/colt_bullet.png",
            img: "img/guns/pistol/colt.png",
            num_of_bullets: 25,
            accuracy: 20,
        },
        magnum: {
            aim: "img/guns/pistol/magnum_aim.png",
            bullet: "img/guns/pistol/magnum_bullet.png",
            img: "img/guns/pistol/magnum.svg",
            num_of_bullets: 25,
            accuracy: 30,
        }
    },
    carbine: {
        ak: {
            aim: "img/guns/carbine/ak_aim.svg",
            bullet: "img/guns/carbine/carbine_bullet.png",
            img: "img/guns/carbine/ak_gun.svg",
            num_of_bullets: 19,
            accuracy: 50,
        },
        m4: {
            aim: "img/guns/carbine/m4_aim.svg",
            bullet: "img/guns/carbine/carbine_bullet.png",
            img: "img/guns/carbine/m4_gun.svg",
            num_of_bullets: 19,
            accuracy: 65,
        }
    },
    sniper: {
        mosinka: {
            aim: "img/guns/sniper/mosinka_aim.png",
            bullet: "img/guns/sniper/sniper_bullet.svg",
            img: "img/guns/sniper/mosinka_gun.svg",
            num_of_bullets: 15,
            accuracy: 90,
        }, 
        sniper: {
            aim: "img/guns/sniper/sniper_aim.svg",
            bullet: "img/guns/sniper/sniper_bullet.svg",
            img: "img/guns/sniper/sniper_gun.svg",
            num_of_bullets: 15,
            accuracy: 100,
        }
    }
};

let totalScoreForAllGame = 0;

let weaponList = [guns.pistol.colt];

let choosenWeapon = guns.pistol.colt;

let choosenHuntPartner;

let choosenScoutPartner;

let choosenCampPartner;

let duck_arr = [];

let newFox;

let foxArr = []

let dead_duck_arr = []

let ducks_on_level = 20;

let prevValOfDucks = ducks_on_level

let duckOnMap = 0;

let isDuckCreated = false

let makeShut = false

let bullets_in_gun;

let sendPartner = false;

let choosenGamePartner;

let levelEnd = false;

let endOpacity = 1

let isGameEnd = false;

var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

var isFirefox = typeof InstallTrigger !== 'undefined';

// var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// console.log(isChrome, isFirefox)
class FinalScore {
    constructor(duck_shot, duck_get, duck_lost, fox_shot, bullet_safe) {
        this.ds = duck_shot
        this.dg = duck_get
        this.dl = duck_lost
        this.fs = fox_shot
        this.bs = bullet_safe
    }
    setDefault() {
        
    }
};

class CampSelfCondition {
    constructor() {
        this.selfHunger = 0
        this.campHunger = 0
        this.targetSpeed = isFirefox ? 10 : 5
    }
    selfChange(x, flag) {
        var a = this.selfHunger
        // console.log(a, flag)
        if (!flag) {
            this.selfHunger = a + x
        } else {
            if (x >= a) {
                this.selfHunger = 0
            } else {
                this.selfHunger = a - x
            }
            
        }
        // console.log(this.selfHunger)
        
    }
    campChange(x, flag) {
        var a = this.campHunger

        if (!flag) {
            this.campHunger = a + x
        } else {
            if (x >= a) {
                this.campHunger = 0
            } else {
                this.campHunger = a - x
            }
           
        }
        

    }
    speedChange() {
        // var a = this.selfHunger
        if (this.selfHunger > 0) {
            this.targetSpeed = 5 - Math.floor(this.selfHunger*5/100)
        }
        
    }
    setDefault() {
        this.selfHunger = 0
        this.campHunger = 0
        this.targetSpeed = isFirefox ? 10 : 5
    }
};

let playerCondition;

let finalScore;

function random_powerlaw(mini, maxi) {
    return (Math.ceil(Math.exp(Math.random()*(Math.log(maxi)-Math.log(mini)))*mini))
};

const Partne = {
    gen: {
        name: "Ген",
        image: "img/partners/gen.png",
        benefit_level: 2,

    }, 
    kinro: {
        name: "Кинро",
        image: "img/partners/kinro.png",
        benefit_level: 3,
    },
    ginro: {
        name: "Гинро",
        image: "img/partners/ginro.png",
        benefit_level: 1,
    }
    
};

class Partner {
    constructor(name, speed, fatigue) {
        this.name = name
        this.speed = speed
        this.fatigue = fatigue
        this.progress = 0
        this.getTime = Math.round(new Date() / 1000)
        this.direction = false
    }
    get() {
        var a = document.getElementById("get-duck_move")
        
        if (this.fatigue != 0) {
            var currentTime = Math.round(new Date() / 1000)
            // if (currentTime - this.getTime > 1) {
                this.getTime = currentTime
                
                if (this.progress < 100 && !this.direction) {
                    this.progress = this.progress + this.speed
                    a.style.width = this.progress + "%"
                } else if (this.progress >= 100) {
                    this.direction = true
                    if (dead_duck_arr.length != 0) {
                        var allDeadDucks = document.getElementById("got_duck_score_num")
                        var numberOfDeadDucks = allDeadDucks.innerText
                        allDeadDucks.innerText = Number(numberOfDeadDucks) + Number(dead_duck_arr.length)
                        dead_duck_arr = []
                    }
                }
    
                if (this.progress > 0 && this.direction) {
                    this.progress = this.progress - this.speed
                    a.style.width = this.progress + "%"
                } else if (this.progress <= 0) { 
                    this.direction = false
                    sendPartner = false
                    this.fatigue -= 1
                    
                }
                
            // }
            document.getElementById("partner_fatigue").innerText = this.fatigue
        
            

        } else {
            sendPartner = false
            var friend = document.getElementsByClassName("friend")[0].getBoundingClientRect()
            var exhausted = document.createElement("div")
            exhausted.classList.add("exhausted")
            document.body.appendChild(exhausted)
            exhausted.style.position = "absolute"
            exhausted.innerHTML = "<span>Sorry,I'm exhausted</span>"
            exhausted.style.fontWeight = "bold"
            exhausted.style.height = 3 + "vh"
            exhausted.style.width = 10 + "vw"
            exhausted.style.backgroundColor = "rgba(255,255,255, 0.7)"
            exhausted.style.borderStyle = "dashed"
            exhausted.style.borderWidth = "medium"
            exhausted.style.borderColor = "white"
            exhausted.style.borderRadius = 5 + "px"
            // exhausted.style.textShadow = "1px 1px #732372, 1px -1px #732372, -1px 1px #732372, -1px -1px #732372, 3px 3px 6px rgba(0,0,0,.5)"
            exhausted.style.top = friend.top - 45 + "px"
            exhausted.style.left = friend.left - 5 + "px"
            setTimeout(function(){
                document.getElementsByClassName("exhausted")[0].remove()
            }, 700)
            // sendPartner = false

        }
        
        
    
    }

}

class Duck {
    constructor(id) {
        this.id = id
        this.prevValLeft = 0;
        this.getTime = Math.round(new Date() / 1000)
        
        this.spriteSheet;
        this.rect
        this.startMoveVar;
        // this.currentTime;
    };

    setProperty(posX, posY, speed) {
        
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        
    };

    create() {
        var a = document.createElement("div")
        a.id = `duck-${this.id}`
        a.classList.add("duck")
        document.getElementById("map").appendChild(a)
        this.spriteSheet = document.getElementById(`duck-${this.id}`)
    };

    move() {
        // console.log(1)
        var currentTime = Math.round(new Date() / 1000)
        var top, left;
        if (currentTime - this.getTime > 1) {
            var topVal;
            var leftVal;
            var bottomMenu = document.getElementById("bottom-menu").clientHeight
            this.getTime = currentTime;
            var duckVspace = window.innerHeight - 157 - bottomMenu;
            var duckHspace = window.innerWidth - 141;
            var random = Math.floor(Math.random() * 4)
            if (random == 2) {
                topVal = Math.floor(Math.random() * duckVspace)
                leftVal = Math.floor(Math.random() * duckHspace)
            } else if (random == 3) {
                topVal = random_powerlaw(1, duckVspace)
                leftVal = random_powerlaw(1, duckHspace)
            } else if ( random == 0) {
                topVal = random_powerlaw(1, duckVspace)
                leftVal = Math.floor(Math.random() * duckHspace)
            } else if (random == 1){
                topVal = Math.floor(Math.random() * duckVspace)
                leftVal = random_powerlaw(1, duckHspace)
            }
            // top = Math.floor(Math.random() * duckVspace),
            // left = Math.floor(Math.random() * duckHspace)
            top = topVal
            left = leftVal
            // console.log(top)
            this.rect = this.spriteSheet.getBoundingClientRect()
            
            
        if (left < this.prevValLeft ) {
            document.getElementById(`duck-${this.id}`).style.transform = ('scale(-1,1)' )
        } else {
            document.getElementById(`duck-${this.id}`).style.transform = ('scale(1,1)')
        }
        this.prevValLeft = left;
        this.spriteSheet.style.top = top + "px";
        this.spriteSheet.style.left = left +"px";

        

        
        } 
        this.rect = this.spriteSheet.getBoundingClientRect()
        // console.log(this.rect.top)
    }; 
    delete_duck() {
        // console.log("www")
        
        for (var v in duck_arr) {
            if (duck_arr[v].id == this.id && v == 0) {
                // console.log(1)
                duck_arr = duck_arr.slice(1,duck_arr.length)
                break
            } else if (duck_arr[v].id == this.id && v == duck_arr.length - 1) {
                // console.log(2)
                duck_arr = duck_arr.slice(0, duck_arr.length-1)
                break
            } else if (duck_arr[v].id == this.id) {
                var count = Number(v)
            
                // console.log(duck_arr.slice(0,v).concat(duck_arr.slice(v+1)))
                
                duck_arr = duck_arr.slice(0,count).concat(duck_arr.slice(count+1))
                // console.log(v,a, b)
                break
            }
        }
        duckOnMap -= 1
        
    }
    shot() {
        // console.log("hello")
        // console.log(bullets_in_gun)
        var accuracy = document.getElementById("game_gun_accuracy").innerText.split("%")[0]
        
        var aim = document.getElementById("target").getBoundingClientRect()
        if (aim.top + 35  > this.rect.top && aim.top + 35 < this.rect.bottom && aim.left + 35 > this.rect.left && aim.left + 35 < this.rect.right && bullets_in_gun >= 0) {
            
            if (Number(random_powerlaw(1,100)) <= Number(accuracy)) {
                var duck_score_num = document.getElementById("duck_score_num")
                var content = Number(duck_score_num.innerText)
                duck_score_num.innerText = content + 1
                this.spriteSheet.style.animation = 'stop'
                this.spriteSheet.style.transition = "top 1s"
                this.spriteSheet.classList.remove("duck")
                this.spriteSheet.classList.add("dead")
                this.spriteSheet.style.top = window.innerHeight - 130 + "px"
                this.spriteSheet.style.left = this.rect.left + "px"
                dead_duck_arr.push(new DeadDuck(this.rect.left, this.id))
                this.delete_duck()
            } else {
                var target = document.getElementById("target").getBoundingClientRect()
                var missed = document.createElement("div")
                missed.classList.add("miss")
                document.body.appendChild(missed)
                // target.appendChild(missed)
                missed.style.position = "absolute"
                missed.textContent = "MISS!"
                // missed.style.fontWeight = "bold"
                missed.style.color = "white"
                missed.style.height = 25 + "px"
                missed.style.width = 35 + "px"
                missed.style.textShadow = "1px 1px #732372, 1px -1px #732372, -1px 1px #732372, -1px -1px #732372, 3px 3px 6px rgba(0,0,0,.5)"
                missed.style.top = target.top -15 + "px"
                missed.style.left = target.left -25 + "px"
                setTimeout(function(){
                    document.getElementsByClassName("miss")[0].remove()
                }, 500)
                // console.log("miss")
            }
            
        } else if (aim.top + 35  > this.rect.top && aim.top + 35 < this.rect.bottom && aim.left + 35 > this.rect.left && aim.left + 35 < this.rect.right && bullets_in_gun < 0) {
            // console.log("nechem strelyat'")
        }
    }
    

};

function endSession(x) {
    weaponList = [guns.pistol.colt];
    choosenWeapon = guns.pistol.colt;
    playerCondition
    playerCondition.setDefault()
    level = Number(x)
    forCamp = 0
    forMe = 0
    endOpacity = 1
    document.body.style.opacity = endOpacity
    foxIdNumber = 0
    duck_arr = []
    foxArr = []
    dead_duck_arr = []
    isFoxCreated = false;
    num_of_text_intro = 0
    isPaused = false
    // pause()
    isGameEnd = false
    duckOnMap = 0
    foxShot = 0
    duckStolen = 0
    ducks_on_level = 20
    sendPartner = false
    totalScoreForAllGame = 0
    clearInterval(timerInterval)
    time = startingMinutes * 60;

};

function getTimeInGame(sec) {
    var timestamp = sec;


    var hours = Math.floor(timestamp / 60 / 60);


    var minutes = Math.floor(timestamp / 60) - (hours * 60);


    var seconds = timestamp % 60;

    var formatted = hours + ':' + minutes + ':' + seconds;

    return formatted
};

function generateFinalScoreMap() {
    document.body.innerHTML = finalScoreGameMap
    document.getElementById("playerName").innerHTML = playerName;
    document.getElementById("total_final_score").innerHTML = totalScoreForAllGame;
    document.getElementById("total_final_time").innerHTML = getTimeInGame(endGameTime - startGameTime)
    document.getElementById("total_final_selfHunger").innerHTML = `${playerCondition.selfHunger}%`
    document.getElementById("total_final_campHunger").innerHTML = `${playerCondition.campHunger}%`
    var a = function (e) {
        if (document.getElementById("final_game_end") != null && e.code == "Enter") {
            window.removeEventListener("keydown", a, false)
            endSession(999)
            
            createMap()
        }
    }
    window.addEventListener("keydown", a, false)
};

function fullGameEnd() {
/////////////////////////
document.body.innerHTML = gameEndMap

var a = function (e) {
    if ((e.code == "ArrowRight" || e.code == "Enter") && document.getElementById("endGameMap") != null) {
        window.removeEventListener("keydown", a, false)
        // document.body.innerHTML
        endGameTime = Math.round(new Date() /1000)
        console.log("finalSocre")
        generateFinalScoreMap()
    }
}
window.addEventListener("keydown", a, false)

};

function badGameOver(x) {
    document.body.innerHTML = gameEndMap
    var text = ""
    if (x) {
        text = "К сожалению, вы погибли от голода."
    } else {
        text = "К сожалению, вас изгнали из лагеря."
    }
    console.log("loaded", document.getElementById("endGameMap"))
    document.getElementById("endGameMap").style.backgroundImage = "url(img/history/loose.jpg)"
    document.querySelector("#endText span").innerHTML = `${text}`
    var a = function (e) {
        if ((e.code == "ArrowRight" || e.code == "Enter") && document.getElementById("endGameMap") != null) {
            window.removeEventListener("keydown", a, false)
            // document.body.innerHTML
            endGameTime = Math.round(new Date() /1000)
            console.log("finalSocre")
            generateFinalScoreMap()
        }
    }
    window.addEventListener("keydown", a, false)
/////////////////
// console.log("you lose")
};

function whoStayInCamp(person) {
    if (person == "kinro") {
        return [5, true]
    } else if (person == "gen") {
        return [0, true]
    } else {
        return [5, false]
    }
};

function bringLoot(partner, level) {

    // console.log(partner, typeof partner, level)
    console
    if (level == 0) {
        if (partner == "kinro") {
            return [guns.carbine.ak, 1]
        } else if (partner == "gen") {
            return [10, 2]
        } else {
            return ["добыл клубок ниток и мусор", 3]
        }
    } else if (level == 1) {
        if (partner == "kinro") {
            return [guns.carbine.m4, 1]
        } else if (partner == "gen") {
            return [10, 2]
        } else {
            return ["убегал от волков и ничего не добыл", 3]
        }
    } else if (level == 2) {
        if (partner == "kinro") {
            return [guns.sniper.mosinka, 1]
        } else if (partner == "gen") {
            return [guns.pistol.magnum, 1]
        } else {
            return [5, 2]
        }
    } else if (level == 3) {
        if (partner == "kinro") {
            return [guns.sniper.sniper, 1]
        } else if (partner == "gen") {
            return [15, 2]
        } else {
            return [10, 2]
        }
    } else if (level == 4) {
        if (partner == "kinro") {
            return [20, 2]
        } else if (partner == "gen") {
            return [15, 2]
        } else {
            return [10, 2]
        }
    }
    // return [1, false]s
};

function getDuck() {
    if (sendPartner) {
        choosenGamePartner.get()
    }
};

function createAndMoveDucks() {
    // console.log(1)
    if (duck_arr.length == 0 && isDuckCreated == true) {
        isDuckCreated = false
    }
    while (duckOnMap < 3 && !isDuckCreated && ducks_on_level != 0) {
        
        var newDuck = new Duck(ducks_on_level)
        duck_arr.push(newDuck)
        ducks_on_level -= 1
        duckOnMap += 1
        
        
    }
    if (!isDuckCreated) {
        isDuckCreated = true
        for (var i of duck_arr) {
            i.create()
        }
    }
    if (duck_arr.length  != 0) {
        for (var i of duck_arr) {
            i.move()
            // console.log(1)
        }
    }
    if (ducks_on_level == 0 && duckOnMap == 0) {
        // console.log("end")
    }
   
    
    // sukaDuck.create()
};

function checkShot() {
    if (makeShut) {
        for (var v of duck_arr) {
            v.shot()
        }
        for (var v of foxArr) {
            v.shotFox()
        }
        makeShut = false
    }
};

function updateCountdown(){ 
    time--;
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 1 ? '0' + seconds : seconds; 
    if (time >= 0){
        countdownEl.innerHTML = `${minutes}: ${seconds}`;
    } else if (time < 0) {
      countdownEl.innerHTML = "Level complete" 
      levelEnd = true
    }
};

function findWeaponIndex(node) {
   
    var a = node.split("/img/")[1].split("guns/")[1]
    for (i in weaponList) {
        if (weaponList[i].img.split("guns/")[1] == a) {
            return i
        }
        
    }
};

function setWeapon(currentWeapon, index) {
    currentWeapon.src = weaponList[index].img
    document.getElementById("choose_weapon_image_aim").src = weaponList[index].aim
    document.getElementById("choose_weapon_accuracy").innerHTML = `Точность: ${weaponList[index].accuracy}%`
    document.getElementById("choose_weapon_num_of_bullets").innerHTML = `Количество патронов: ${weaponList[index].num_of_bullets}`
};

function setPartnerRight() {
    var currentNode = document.getElementsByClassName("choose_mark")[0]
    var currentPartner;
    var currentAccuracy;
    if (currentNode.id == "choose_hunt") {
        currentPartner = document.getElementsByClassName("choose_partner_image")[0]
        currentAccuracy = document.getElementsByClassName("choose_block_benefit")[0]
    } else if (currentNode.id == "choose_scout") {
        currentPartner = document.getElementsByClassName("choose_partner_image")[1]
        currentAccuracy = document.getElementsByClassName("choose_block_benefit")[1]
    } else if (currentNode.id == "choose_camp") {
        currentPartner = document.getElementsByClassName("choose_partner_image")[2]
        currentAccuracy = document.getElementsByClassName("choose_block_benefit")[2]
    }

    var name = currentPartner.src.split("partners/")[1].split(".png")[0]
    if (name == "gen") {
        currentPartner.src = Partne.kinro.image
        currentAccuracy.innerHTML = "Польза: Отлично"
        currentPartner.classList.remove("gen_partner")
        currentPartner.classList.add("kinro_partner")
    } else if (name == "kinro") {
        currentPartner.src = Partne.ginro.image
        currentAccuracy.innerHTML = "Польза: Плохо"
        currentPartner.classList.remove("kinro_partner")
        currentPartner.classList.add("ginro_partner")
    } else if (name == "ginro"){
        currentPartner.src = Partne.gen.image
        currentAccuracy.innerHTML = "Польза: Хорошо"
        currentPartner.classList.remove("ginro_partner")
        currentPartner.classList.add("gen_partner")
    }
};

function setPartnerLeft() {
    var currentNode = document.getElementsByClassName("choose_mark")[0]
    var currentPartner;
    var currentAccuracy;
    if (currentNode.id == "choose_hunt") {
        currentPartner = document.getElementsByClassName("choose_partner_image")[0]
        currentAccuracy = document.getElementsByClassName("choose_block_benefit")[0]
    } else if (currentNode.id == "choose_scout") {
        currentPartner = document.getElementsByClassName("choose_partner_image")[1]
        currentAccuracy = document.getElementsByClassName("choose_block_benefit")[1]
    } else if (currentNode.id == "choose_camp") {
        currentPartner = document.getElementsByClassName("choose_partner_image")[2]
        currentAccuracy = document.getElementsByClassName("choose_block_benefit")[2]
    }

    var name = currentPartner.src.split("partners/")[1].split(".png")[0]
    if (name == "gen") {
        
        currentPartner.src = Partne.ginro.image
        currentAccuracy.innerHTML = "Польза: Плохо"
        currentPartner.classList.remove("gen_partner")
        currentPartner.classList.add("ginro_partner")
    } else if (name == "kinro") {
        currentPartner.src = Partne.gen.image
        currentAccuracy.innerHTML = "Польза: Хорошо"
        currentPartner.classList.remove("kinro_partner")
        currentPartner.classList.add("gen_partner")
    } else if (name == "ginro"){
        currentPartner.src = Partne.kinro.image
        currentAccuracy.innerHTML = "Польза: Отлично"
        currentPartner.classList.remove("ginro_partner")
        currentPartner.classList.add("kinro_partner")
    }
};

var startGameEventListener = function (e) {
    if (e.key == "ArrowDown" || e.key == "ArrowUp") {
        var activeButton = document.querySelector("div button.marked")
        var inactiveButton = document.querySelector("div button:not(.marked)")

        if (activeButton != null && inactiveButton != null) {
            activeButton.classList.remove("marked")
            inactiveButton.classList.add("marked")
            // console.log(activeButton, inactiveButton)
        }
        
    };
    
    if (e.key == "Enter") {
        var choosen = document.querySelector("div button.marked");
        var enterName = document.getElementsByClassName("enter-name")[0];
        if (choosen != null) {
            if (choosen.textContent == "New Game") {
                document.getElementsByClassName("start-menu")[0].innerHTML = `<input type="text" placeholder="Enter your name" class="enter-name">`
                document.getElementsByClassName("enter-name")[0].focus()
            } else {
                console.log(2) //////////Dashboard
            }
        }
        if (enterName != null) {
            if (enterName.value.split(" ").length > 1){
                alert("Name must be entered without spaces")
            } else if (enterName.value == "") {
                alert("Enter your name")
            } else if (!enterName.value.match("^[A-Za-z0-9]+$")){
                alert("Name must contain only latin characters and digits")
            }else {
                playerName = enterName.value;    
                level = 0
                playerCondition = new CampSelfCondition()
                startGameTime = Math.round(new Date() /1000)
                window.removeEventListener("keydown", startGameEventListener, false)
                createMap()
            }
        } 
    }
};

function createAndMoveFox() {
    console.log(dead_duck_arr)
    // console.log(foxArr)
    if (!isFoxCreated && foxIdNumber <= 4) {
        var currentTime = Math.round(new Date() /1000)
        // console.log(currentTime - foxAppearTime)
        if (currentTime - foxAppearTime >= 15) {
            foxAppearTime = currentTime
            foxArr[foxIdNumber].createFox()
            foxAppearTime = Math.round(new Date() /1000)
            isFoxCreated = true
            
        }
        
    } else if (isFoxCreated && foxIdNumber <= 4) {
        foxArr[foxIdNumber].moveFox()
        
    } 
    // newFox.moveFox()
}//////////////////////////////////////////////////

if (!isPaused) {
    var isDown = false;
    var isLeft = false;
    var isUp = false;
    var isRight = false;
    window.addEventListener("keydown", (e) => {
        if (e.key == "ArrowRight") {
            isRight = true
        }
        if (e.key == "ArrowDown") {
            isDown = true
        }
        if (e.key == "ArrowLeft") {
            isLeft = true
        }
        if (e.key == "ArrowUp") {
            isUp = true
        }
    });
    window.addEventListener("keyup", (e) => {
        if (e.key == "ArrowRight") {
            isRight = false
        }
        if (e.key == "ArrowDown") {
            isDown = false
        }
        if (e.key == "ArrowLeft") {
            isLeft = false
        }
        if (e.key == "ArrowUp") {
            isUp = false
        }
    });
};

function game() {
    aimMovement()
    createAndMoveDucks()
    
    createAndMoveFox()
    checkShot()
    // cleanTree()
    getDuck()
    checkGameEnd()
    if (!isGameEnd) {
        playGame = requestAnimationFrame(game);
    }
   
    // console.log(1)

};

function pause() {
    cancelAnimationFrame(playGame)
    
};

function createOverlay() {
    var a = document.createElement("div")
    var content = document.createElement("div")
    content.id = "game-pause-content"
    content.innerHTML = `<button id ="pause-continue-id" class="pause-button pause-continue marked-pause">Continue</button>
                        <button id ="pause-restart-id" class="pause-button pause-restart">Restart</button>`
    a.appendChild(content)
    a.classList.add("overlay")
  
    a.id = "game-pause"
    document.body.appendChild(a);
    
}

function checkGameEnd() {
    cancelAnimationFrame(playGame)
    var bullets = Number(document.getElementsByClassName("game_bullet").length)
    if ((levelEnd || (bullets == 0 && choosenGamePartner.fatigue == 0) || (bullets == 0 && dead_duck_arr.length == 0)) && document.getElementById("map") != null) {
        endOpacity = endOpacity - 0.005
        // var currnetOpacity = Number(document.body.style.opacity) - 0.001
        document.body.style.opacity = endOpacity
        // cancelAnimationFrame(playGame)
        if (endOpacity <= 0) {
            console.log("hello")
            cancelAnimationFrame(playGame)
            isGameEnd = true
            endGame()
            // console.log(finalScore)
        }

    }
};

function manageMenuAndFinalScore() {
    document.body.innerHTML = manageFinalScore
    // console.log(document.body.childElementCount)
    document.getElementById("score_ds").innerHTML = finalScore.ds
    document.getElementById("score_ds_final").innerHTML = finalScore.ds*10
    document.getElementById("score_dg").innerHTML = finalScore.dg   
    document.getElementById("score_dg_final").innerHTML = finalScore.dg*20
    document.getElementById("score_fs").innerHTML = finalScore.fs
    document.getElementById("score_fs_final").innerHTML = finalScore.fs*5
    document.getElementById("score_dl").innerHTML = finalScore.dl
    document.getElementById("score_dl_final").innerHTML = -finalScore.dl*7
    document.getElementById("score_bs").innerHTML = finalScore.bs
    document.getElementById("score_bs_final").innerHTML = finalScore.bs*15
    var currentScore = finalScore.ds*10 + finalScore.dg*20 + finalScore.fs*5 + finalScore.bs*15 - finalScore.dl*7
    document.getElementById("score_all_final").innerHTML = currentScore
    totalScoreForAllGame = totalScoreForAllGame + currentScore
    document.getElementById("score_all_games_passed").innerHTML = ` (${totalScoreForAllGame})`

    document.getElementById("level_week").innerHTML = `${level+1} недели`
    var stayedInCamp = whoStayInCamp(choosenCampPartner)
    playerCondition.campChange(stayedInCamp[0], stayedInCamp[1])
    document.getElementById("anger_level_final").innerHTML = `${playerCondition.campHunger}%`

    var loot = bringLoot(choosenScoutPartner, level)
    // console.log("loot-", loot)
    var idLooter = document.getElementById("loot_root")
    // console.log("helllllo", idLooter)

    var getFood = 0;
    if (loot[1] == 1) {
        weaponList.push(loot[0])
        idLooter.innerHTML = `<span id="gun_loot_margin">На разведке ${Partne[choosenScoutPartner].name} добыл  - </span><div id="gun_loot"><img id="gun_loot_img" src="${loot[0].img}"></div>`
    } else if (loot[1] == 2) {
        idLooter.innerHTML = `На разведке ${Partne[choosenScoutPartner].name} нашел еду (-${loot[0]}% от голода)`
        getFood = loot[0]
    } else if (loot[1] == 3) {
        idLooter.innerHTML = `На разведке ${Partne[choosenScoutPartner].name} ${loot[0]}`
    }

    var duck_for_me = document.getElementById("duck_for_me")
    var duck_for_camp = document.getElementById("duck_for_camp")

    var duck_for_me_in_percent = document.getElementById("duck_for_me_in_percent")
    var duck_for_camp_in_percent = document.getElementById("duck_for_camp_in_percent")

    var duck_for_me_count = Math.floor(finalScore.dg/2)
    var duck_for_camp_count = finalScore.dg - duck_for_me_count

    var duck_for_me_in_percent_count = duck_for_me_count*5
    var duck_for_camp_in_percent_count = duck_for_camp_count*5
    // console.log(duck_for_me, duck_for_me_count)
    // console.log(duck_for_camp, duck_for_camp_count)
    duck_for_me.innerHTML = duck_for_me_count
    duck_for_camp.innerHTML = duck_for_camp_count

    duck_for_me_in_percent.innerHTML = `(${duck_for_me_in_percent_count}%)`
    duck_for_camp_in_percent.innerHTML = `(${duck_for_camp_in_percent_count}%)`
    var a = function (e) {
        
        if ((e.code == "ArrowDown" || e.code == "ArrowUp") && Number(document.body.childElementCount) == 1 && document.getElementsByClassName("score_map")[0] != null) {
            var getClass = document.querySelector("div.confirm_manage_menu.choose_manage_mark")
            var noClass = document.querySelector("div.confirm_manage_menu:not(.choose_manage_mark)")
            getClass.classList.remove("choose_manage_mark")
            noClass.classList.add("choose_manage_mark")
            // console.log(getClass, noClass)
            //.classList.remove("choose_manage_mark")
        } else if (e.code == "ArrowLeft" && Number(document.body.childElementCount) == 1 && document.getElementsByClassName("score_map")[0] != null) {
            if (document.getElementsByClassName("choose_manage_mark")[0].id == "manage_tool_bar" ) {
                var duck_for_me = document.getElementById("duck_for_me")
                var duck_for_camp = document.getElementById("duck_for_camp")
                var duck_for_me_count = Number(document.getElementById("duck_for_me").textContent)
                var duck_for_camp_count =Number(document.getElementById("duck_for_camp").textContent)

                var duck_for_me_in_percent = document.getElementById("duck_for_me_in_percent")
                var duck_for_camp_in_percent = document.getElementById("duck_for_camp_in_percent")
        

                if (duck_for_camp_count != 0) {
                    duck_for_me_count = duck_for_me_count + 1
                    duck_for_camp_count = duck_for_camp_count - 1
                }
                duck_for_me.innerHTML = duck_for_me_count
                duck_for_camp.innerHTML = duck_for_camp_count
                duck_for_me_in_percent.innerHTML = `(${duck_for_me_count*5}%)`
                duck_for_camp_in_percent.innerHTML = `(${duck_for_camp_count*5}%)`

                // forMe = Number(duck_for_me_count)
                // forCamp = Number(duck_for_camp_count)
                // console.log(forMe, forCamp)
            }

        } else if (e.code == "ArrowRight" && Number(document.body.childElementCount) == 1 && document.getElementsByClassName("score_map")[0] != null) {
            if (document.getElementsByClassName("choose_manage_mark")[0].id == "manage_tool_bar" ) {
                var duck_for_me = document.getElementById("duck_for_me")
                var duck_for_camp = document.getElementById("duck_for_camp")
                var duck_for_me_count = Number(document.getElementById("duck_for_me").textContent)
                var duck_for_camp_count =Number(document.getElementById("duck_for_camp").textContent)

                var duck_for_me_in_percent = document.getElementById("duck_for_me_in_percent")
                var duck_for_camp_in_percent = document.getElementById("duck_for_camp_in_percent")

                if (duck_for_me_count != 0) {
                    duck_for_me_count = duck_for_me_count - 1
                    duck_for_camp_count = duck_for_camp_count + 1
                }
                duck_for_me.innerHTML = duck_for_me_count
                duck_for_camp.innerHTML = duck_for_camp_count

                duck_for_me.innerHTML = duck_for_me_count
                duck_for_camp.innerHTML = duck_for_camp_count
                duck_for_me_in_percent.innerHTML = `(${duck_for_me_count*5}%)`
                duck_for_camp_in_percent.innerHTML = `(${duck_for_camp_count*5}%)`
                // forMe = Number(duck_for_me_count)
                // forCamp = Number(duck_for_camp_count)
                // console.log(typeof forMe, forCamp)
                
            }

        } else if (e.code == "Enter" && Number(document.body.childElementCount) == 1 && document.getElementsByClassName("score_map")[0] != null) {
            if (document.getElementsByClassName("choose_manage_mark")[0].id == "choose_manage_submit" ) {
                level += 1
                var duck_for_me_count = Number(document.getElementById("duck_for_me").textContent)
                var duck_for_camp_count = Number(document.getElementById("duck_for_camp").textContent)
                // console.log(duck_for_me_count, duck_for_camp_count)
                // console.log("enter")
                window.removeEventListener("keydown", a, false)
                playerCondition.selfChange(34, false)

                playerCondition.selfChange(duck_for_me_count*5, true)

                playerCondition.campChange(34, false)

                playerCondition.campChange(duck_for_camp_count*5, true)

                playerCondition.selfChange(getFood, true)
                playerCondition.campChange(getFood, true)

                forCamp = 0
                forMe = 0

                playerCondition.speedChange()
                // console.log(playerCondition.selfHunger, playerCondition.campHunger)
                if (playerCondition.selfHunger >= 100) {
                    badGameOver(true)
                } else if (playerCondition.campHunger >= 100) {
                    badGameOver(false)
                } else {
                    createMap()
                }
                //////////////////////////////////////////////////////////hunger 
                
            }
        }
    }
    window.addEventListener("keydown", a, false)

};

function endGame() {
    levelEnd = false
    var duck_shot = Number(document.getElementById("duck_score_num").innerText)
    var duck_get = Number(document.getElementById("got_duck_score_num").innerText)
    var duck_lost = duckStolen; //////////////////////////////////////////////////////// change
    var fox_shot = foxShot; ///////////////////////////////////////////////////////////change
    var bullet_safe = Number(document.getElementsByClassName("game_bullet").length) 
    finalScore = new FinalScore(duck_shot, duck_get, duck_lost, fox_shot, bullet_safe)
    
    clearInterval(timerInterval)
    

    endOpacity = 1
    document.body.style.opacity = endOpacity
    duck_arr = []
    dead_duck_arr = []
    foxIdNumber = 0
    foxArr = []
    isFoxCreated = false;
    foxShot = 0
    duckStolen = 0
    duckOnMap = 0
    ducks_on_level = 20
    sendPartner = false
    time = startingMinutes * 60;
    

    manageMenuAndFinalScore()
    
    
};

function generateGameMap(level) {
    document.body.innerHTML = gameMap
    var x = document.getElementById("myAudio");
    x.play();
    var choosenWeaponType;
    if (choosenWeapon == "ak" || choosenWeapon == "m4") {
        choosenWeaponType = "carbine"
    } else if (choosenWeapon == "colt" || choosenWeapon == "magnum") {
        choosenWeaponType = "pistol"
    } else if (choosenWeapon == "sniper" || choosenWeapon == "mosinka") {
        choosenWeaponType = "sniper"
    }
    // console.log(level, choosenWeaponType, choosenWeapon)
    var usedGunProperty = guns[choosenWeaponType][choosenWeapon]
    // console.log(usedGunProperty)
    document.getElementsByClassName("game_gun_image")[0].src =  usedGunProperty.img
    document.getElementById("game_gun_accuracy").innerHTML = `${usedGunProperty.accuracy}%`
    document.getElementById("game_gun_num_of_bullets").innerHTML = `${usedGunProperty.num_of_bullets}`
    var bulletCount = usedGunProperty.num_of_bullets
    bullets_in_gun = Number(bulletCount)
    var htmlBullet = ""
    while (bulletCount != 0) {
        htmlBullet += `<li><img src="${usedGunProperty.bullet}" class="game_bullet"></li>`
        bulletCount -= 1
    }
    document.getElementsByClassName("all_bullets_image")[0].innerHTML = htmlBullet
    document.getElementById("hunger_level").innerHTML = `${playerCondition.selfHunger}%`

    document.getElementById("partner_name").innerHTML = Partne[choosenHuntPartner].name
    document.getElementById("partner_fatigue").innerHTML = Partne[choosenHuntPartner].benefit_level * 2
    document.getElementsByClassName("friend_photo")[0].src = Partne[choosenHuntPartner].image
    countdownEl = document.getElementById('timer');
    var getMapStyle = document.getElementById("map").style
    if (level != 3) {
        getMapStyle.backgroundImage = `url(img/bg${level}.jpg)`
    } else {
        getMapStyle.backgroundImage = `url(img/bg${level}.png)`
    }
    
    
    choosenGamePartner = new Partner(Partne[choosenHuntPartner].name, Partne[choosenHuntPartner].benefit_level*0.1, Partne[choosenHuntPartner].benefit_level*2)
    timerInterval = setInterval (updateCountdown, 1000);
    foxAppearTime = Math.round(new Date() /1000)
    // newFox = new Fox(1)
    // newFox.createFox() ///////////////////
    // createAndMoveDucks()
    // moveDucks()
    



};

window.addEventListener("keydown", (e)=> {
    if (document.getElementById("map") != null) {
        if (e.code == "Space" && isPaused == false) {
            //  console.log(dead_duck_arr)
             isPaused = true
             var x = document.getElementById("myAudio");
             x.pause();
             var y = document.getElementById("foxMove")
             y.pause()
             clearInterval(timerInterval)
             for (var y of duck_arr) {
                // var needId = Number(i.split("-")[1])
                y.spriteSheet.style.top = y.rect.top + "px"
                y.spriteSheet.style.left = y.rect.left + "px"
                y.spriteSheet.style.animation = 'stop'
                y.spriteSheet.style.transition = 'stop'
            }
            var x = document.getElementsByClassName("fox")
            var i;
            for (i = 0; i < x.length;i++) {
                x[i].style.animation = 'stop'
                x[i].style.transition = 'stop'
            }
             createOverlay()
             pause()
        } else if (e.code == "Space" && isPaused == true){
             isPaused = false
             for (var y of duck_arr) {
                // var needId = Number(i.split("-")[1])
                y.spriteSheet.style.animation = "play 0.9s steps(2) infinite"
                y.spriteSheet.style.transition = "top 4s, left 4s"
            }
            var x = document.getElementsByClassName("fox")
            var i;
            for (i = 0; i < x.length;i++) {
                x[i].style.animation = "play1 2.5s steps(2) infinite"
                x[i].style.transition = "right 1s"
            }
             var x = document.getElementById("myAudio");
             x.play();
             document.getElementById("game-pause").remove();
             timerInterval = setInterval(updateCountdown, 1000)
             playGame = requestAnimationFrame(game)
        } else if (e.code == "KeyS" && makeShut == false && document.getElementsByClassName("overlay")[0] == null) {
            var y = document.getElementById("shot");
            y.play()
            // console.log(1)
            bullets_in_gun -= 1
            var number_of_bullet = document.getElementsByClassName("game_bullet")
        // var empty_bullet = document.getElementsByClassName("used_bullet")
            if (number_of_bullet.length == 0) {
                var y = document.getElementById("shot");
                y.pause()
                var x = document.getElementById("emptygun")
                x.play()
                // console.log("empty")
            } else {
                number_of_bullet[number_of_bullet.length-1].classList.add("used_bullet")
                number_of_bullet[number_of_bullet.length-1].classList.remove("game_bullet")
                // x.play()
            }
            makeShut = true
        } else if (e.code == "KeyG" && sendPartner == false) {
            if (!isPaused) {
                // console.log("done")

                sendPartner = true
            }
            
        }
    }
});

function aimMovement() {
    if (document.getElementById("map") != null){
        var bottomMenu = document.getElementById("bottom-menu").clientHeight;
    
    var crossTop = document.getElementById("target").offsetTop;
    var crossLeft = document.getElementById("target").offsetLeft;
    // console.log(crossLeft)
    if (isDown && isUp && isLeft && isRight){

    } else if (isDown && isRight) {
        if (isLeft) {
            if (crossTop < window.innerHeight - 75 - bottomMenu) {
                target.style.top = crossTop + playerCondition.targetSpeed + "px"
            }          
        } else if (isUp) {
            if (crossLeft < window.innerWidth - 77) {
                target.style.left = crossLeft + playerCondition.targetSpeed + "px"
            }
            
        } else {
            if (crossTop < window.innerHeight - 75 - bottomMenu) {
                target.style.top = crossTop + playerCondition.targetSpeed + "px"
            }
            if (crossLeft < window.innerWidth - 77) {
                target.style.left = crossLeft + playerCondition.targetSpeed + "px"
            }
            
        }
        
        
    } else if (isDown && isLeft){
        if (isRight) {
            if (crossTop < window.innerHeight - 75 - bottomMenu) {
                target.style.top = crossTop + playerCondition.targetSpeed + "px"
            }
            
        } else if (isUp){
            if (crossLeft > 0) {
                target.style.left = crossLeft - playerCondition.targetSpeed + "px"
            }
        } else {
            if (crossTop < window.innerHeight - 75 - bottomMenu) {
                target.style.top = crossTop + playerCondition.targetSpeed + "px"
            }
            if (crossLeft > 0) {
                target.style.left = crossLeft - playerCondition.targetSpeed + "px"
            }
            
        }
        
    } else if (isUp && isRight) {
        if (isLeft) {
            if (crossTop > 0) {
                target.style.top = crossTop - playerCondition.targetSpeed + "px"
            }
        }else if (isDown) {
            if (crossLeft > 0) {
                target.style.left = crossLeft - playerCondition.targetSpeed + "px"
            }
        }else {
            if (crossTop > 0) {
                target.style.top = crossTop - playerCondition.targetSpeed + "px"
            }
            if (crossLeft < window.innerWidth - 77) {
                target.style.left = crossLeft + playerCondition.targetSpeed + "px"
            }
        }
        
        
    } else if (isUp && isLeft) {
        if (isRight) {
            if (crossTop > 0) {
                target.style.top = crossTop - playerCondition.targetSpeed + "px"
            }
        }else if (isDown) {
            if (crossLeft > 0) {
                target.style.left = crossLeft - playerCondition.targetSpeed + "px"
            }
        } else {
            if (crossTop > 0) {
                target.style.top = crossTop - playerCondition.targetSpeed + "px"
            }
            if (crossLeft > 0) {
                target.style.left = crossLeft - playerCondition.targetSpeed + "px"
            }
        }
        
    } else if (isUp) {
        if (!isDown) {
            if (crossTop > 0) {
                target.style.top = crossTop - playerCondition.targetSpeed + "px"
            }
        }
       
    } else if (isRight) {
        if (!isLeft) {
            if (crossLeft < window.innerWidth - 77) {
                target.style.left = crossLeft + playerCondition.targetSpeed + "px"
            }
        }
    } else if (isDown) {
        if (!isUp) {
            if (crossTop < window.innerHeight - 75 - bottomMenu) {
                target.style.top = crossTop + playerCondition.targetSpeed + "px"
            }
        }
    } else if (isLeft) {
        if (!isRight) {
           if (crossLeft > 0) {
                target.style.left = crossLeft - playerCondition.targetSpeed + "px"
            }
        }
        
    }
    }
    

};

function createAim() {
    var target = document.createElement("img")
    var map = document.getElementById("map")
    map.appendChild(target)
    if (choosenWeapon == "ak" || choosenWeapon == "m4") {
        choosenWeaponType = "carbine"
    } else if (choosenWeapon == "colt" || choosenWeapon == "magnum") {
        choosenWeaponType = "pistol"
    } else if (choosenWeapon == "sniper" || choosenWeapon == "mosinka") {
        choosenWeaponType = "sniper"
    }
    // console.log(level, choosenWeaponType, choosenWeapon)
    var usedGunProperty = guns[choosenWeaponType][choosenWeapon]
    target.src = usedGunProperty.aim
    target.id = "target"
    target.style.position = "absolute";
    target.style.left = window.innerWidth*0.8/2 - 35 + "px";
    target.style.top = window.innerHeight/2 - 35 + "px";
};

function defineDialogue(color, name, text, num_of_text) {
    var speaker1_text = document.querySelector("#dialogue #speaker-text")
    var speaker1_name = document.getElementById("speaker-name")
    speaker1_text.innerHTML = text[num_of_text]
    document.getElementById("dialogue").style.borderColor = color
    speaker1_name.textContent = name
    speaker1_name.style.borderColor = color
};

function generateTutorialMap() {
    document.body.innerHTML = tutorialMap
    var a = function (e) {
        if ((e.code == "ArrowRight" || e.code == "Enter") && document.getElementById("tutorialMap") != null) {
            window.removeEventListener("keydown", a, false)
            prepareMenu()
        }
    }
    window.addEventListener("keydown", a, false)
};

function prepareMenu() {
    // console.log(getEventListeners(window))
    // console.table(listAllEventListeners())
    // console.log(window)
    // location.reload();
    document.body.innerHTML = prepareMap
    var a = function (e) {
        if (e.key == "ArrowDown" && document.getElementsByClassName("choose_map") != null && document.getElementById("map") == null && document.getElementsByClassName("score_map")[0] == null && Number(document.body.childElementCount) == 1) {
            var currentNode = document.getElementsByClassName("choose_mark")[0]
            if (currentNode.nextElementSibling != null) {
                currentNode.nextElementSibling.classList.add("choose_mark")
            } else {
                document.getElementsByClassName("choose_menu")[0].classList.add("choose_mark")
            }
            currentNode.classList.remove("choose_mark")
        } else if (e.key == "ArrowUp" && document.getElementsByClassName("choose_map") != null && document.getElementById("map") == null && document.getElementsByClassName("score_map")[0] == null && Number(document.body.childElementCount) == 1) {
            var currentNode = document.getElementsByClassName("choose_mark")[0]
            if (currentNode.previousElementSibling != null) {
                currentNode.previousElementSibling.classList.add("choose_mark")
            } else {
                document.getElementsByClassName("choose_menu")[document.getElementsByClassName("choose_menu").length - 1].classList.add("choose_mark")
            }
            currentNode.classList.remove("choose_mark")
        } else if (e.key == "ArrowRight" && document.getElementsByClassName("choose_map") != null && document.getElementById("map") == null && document.getElementsByClassName("score_map")[0] == null && Number(document.body.childElementCount) == 1) {
            var currentNode = document.getElementsByClassName("choose_mark")[0]
            if (currentNode.id == "choose_weapon") {    
                var currentWeapon = document.getElementById("choose_weapon_image")
                var currentWeaponIndex = Number(findWeaponIndex(currentWeapon.src))
            
                if (currentWeaponIndex == weaponList.length - 1) {
                    setWeapon(currentWeapon, 0)
                } else {
                    setWeapon(currentWeapon, currentWeaponIndex+1)
                    
                }

            } else if (currentNode.id == "choose_hunt") {
                setPartnerRight()
            } else if (currentNode.id == "choose_scout") {
                setPartnerRight()
            } else if (currentNode.id == "choose_camp") {
                setPartnerRight()
            }
        } else if (e.key == "ArrowLeft" && document.getElementsByClassName("choose_map") != null && document.getElementById("map") == null && document.getElementsByClassName("score_map")[0] == null && Number(document.body.childElementCount) == 1) {
            var currentNode = document.getElementsByClassName("choose_mark")[0]
            if (currentNode.id == "choose_weapon") {    
                var currentWeapon = document.getElementById("choose_weapon_image")
                var currentWeaponIndex = Number(findWeaponIndex(currentWeapon.src))
            
                if (currentWeaponIndex == 0) {
                    setWeapon(currentWeapon, weaponList.length - 1)
                } else {
                    setWeapon(currentWeapon, currentWeaponIndex-1)
                    
                }

            } else if (currentNode.id == "choose_hunt") {
                setPartnerLeft()
            } else if (currentNode.id == "choose_scout") {
                setPartnerLeft()
            } else if (currentNode.id == "choose_camp") {
                setPartnerLeft()
            }
        } else if (e.key == "Enter" && document.getElementsByClassName("choose_map") != null && document.getElementById("map") == null && document.getElementsByClassName("score_map")[0] == null && Number(document.body.childElementCount) == 1) {
            if (document.getElementsByClassName("choose_mark")[0].id == "choose_submit") {
                var genPers = document.getElementsByClassName("gen_partner")
                var kinroPers = document.getElementsByClassName("kinro_partner")
                var ginroPers = document.getElementsByClassName("ginro_partner")
                if (kinroPers.length != 1 || genPers.length != 1 || ginroPers.length != 1) {
                    alert("Распределите напарников! (По одному на каждое дело)")
                } else {
                    choosenHuntPartner = document.querySelector("#choose_hunt img.choose_partner_image").src.split("/partners/")[1].split(".png")[0]
                    choosenScoutPartner = document.querySelector("#choose_scout img.choose_partner_image").src.split("/partners/")[1].split(".png")[0]
                    choosenCampPartner = document.querySelector("#choose_camp img.choose_partner_image").src.split("/partners/")[1].split(".png")[0]
                    var getWeapon = document.querySelector("#choose_weapon #choose_weapon_image").src.split("/")
                    choosenWeapon = getWeapon[getWeapon.length-1].split(".")[0].split("_gun")[0]
                    // a = null
                    // removeListenersFromElement(window, "keydown")
                    window.removeEventListener("keydown", a, false)
                    var i = 4;
                    while (i >= 0) {

                        foxArr.push(new Fox(i))
                        i -= 1
                    }
                    createMap()
                }
            }
            
        }
    }
    window.addEventListener("keydown", a, false)
};

var intro_menu_display = function (e) {
    if (e.code == "KeyQ" && document.getElementById("map") == null && document.getElementsByClassName("choose_map")[0] == null && document.getElementsByClassName("score_map")[0] == null && Number(document.body.childElementCount) == 1 && document.getElementById("intro-scene") != null && level == 0) {
        
        // prepareMenu()
        window.removeEventListener("keydown", a, false)
        generateTutorialMap()
    } else if (e.code == "KeyQ"  && Number(document.body.childElementCount) == 6 && document.getElementById("idCheck") != null && level == 0) {
        // prepareMenu()
        window.removeEventListener("keydown", a, false)
        generateTutorialMap()
    } else if (e.key == "ArrowRight" && level == 0) {
        if (document.getElementById("map") == null && document.getElementsByClassName("choose_map")[0] == null) {
            if (num_of_text_intro < 3 && document.getElementById("intro-scene") != null) {
                var a = document.createElement("div");
                a.classList.add("story-tell")
                a.textContent = text_intro[num_of_text_intro]
                num_of_text_intro += 1;
                document.getElementById("intro-scene").appendChild(a)
            } else if (num_of_text_intro < 8 && document.getElementById("intro-scene") != null){
                if (num_of_text_intro == 3) {
                    document.body.innerHTML = introDisplay
                }
                
                document.getElementsByClassName("overlay")[0].style.backgroundColor = "rgba(0,0,0, .7)"
                if (num_of_text_intro%2 != 0) {
                    defineDialogue("greenyellow", playerName, text_intro, num_of_text_intro)

                } else {
                    
                    defineDialogue("purple", "Ген", text_intro, num_of_text_intro)
                    document.querySelector("#second_speaker img").src = "img/history/gen.png"
                }
                
                num_of_text_intro++

            } else if (num_of_text_intro < 12 && document.getElementById("idCheck") != null){
                document.getElementsByClassName("intro_menu")[0].style.backgroundImage = "url(img/history/think.jpg)"
                if (num_of_text_intro%2 != 0) {
                    defineDialogue("greenyellow", playerName, text_intro, num_of_text_intro)
                } else {
                    defineDialogue("blue", "Кинро",text_intro , num_of_text_intro)
                    document.querySelector("#second_speaker img").src = "img/history/kinro.png"
                }
                num_of_text_intro++
            } else if (num_of_text_intro < 18 && document.getElementById("idCheck") != null){
                document.getElementsByClassName("intro_menu")[0].style.backgroundImage = "url(img/history/think.jpg)"
                if (num_of_text_intro%2 != 0) {
                    defineDialogue("greenyellow", playerName, text_intro, num_of_text_intro)
                } else {
                    defineDialogue("yellow", "Гинро", text_intro, num_of_text_intro)
                    document.querySelector("#second_speaker img").src = "img/history/ginro.png"
                }
                num_of_text_intro++
            } else if (num_of_text_intro < 22 && document.getElementById("idCheck") != null){
                if (num_of_text_intro == 20) {
                    document.getElementsByClassName("intro_menu")[0].style.backgroundImage = "url(img/history/four.jpg)"
                }
                
                defineDialogue("greenyellow", playerName, text_intro, num_of_text_intro)
                num_of_text_intro++
            } else if (num_of_text_intro < 23 && document.getElementById("idCheck") != null) {
                defineDialogue("blue", "Кинро", text_intro, num_of_text_intro)
                document.querySelector("#second_speaker img").src = "img/history/kinro.png"
                num_of_text_intro++
            } else if (num_of_text_intro <= 29 && document.getElementById("idCheck") != null){
                defineDialogue("greenyellow", playerName, text_intro, num_of_text_intro)
                num_of_text_intro++
                
            }
            if (num_of_text_intro == 30) {
                // prepareMenu()
                window.removeEventListener("keydown", a, false)
                generateTutorialMap()
            }
        }
        
    }
};

function createMap() {
    if (level == 999) {
        document.body.innerHTML = mainMenu;
        window.addEventListener("keydown", startGameEventListener, false)
        
       
    } else if (level == 0) {
        // console.log(playerCondition.targetSpeed)
        if (!introMenu) {
            introMenu = true
            
            document.body.innerHTML = intro_0_level;
            
            
            window.addEventListener("keydown", intro_menu_display, false)
        } else if (!gameMenu) {
            generateGameMap(level)
            createAim()
            introMenu = false
            playGame = requestAnimationFrame(game)
        }
        
    } else if (level == 1) {
        if (!introMenu) {
            introMenu = true
            var num_of_text = 0
            document.body.innerHTML = introDisplay
            document.getElementsByClassName("intro_menu")[0].style.backgroundImage = "url(img/history/week1.jpg)"
            var textMe = [
                "Это было не самое простое занятие.",
                "Надеюсь в следующий раз нам повезет больше."
            ];
            var textGinro = [
                `Мы ничего не поймали, лагерь будет в бешенстве.`,
                `Мы поймали всего ${finalScore.dg}. На всех точно не хватит`,
                `Мы поймали целых ${finalScore.dg}, думаю этого нам хватит на долго.`
            ];
            defineDialogue("greenyellow", playerName, textMe, num_of_text)
            num_of_text += 1
            window.addEventListener("keydown", (e) => {
                if (e.code == 'KeyQ' && Number(document.body.childElementCount) == 6 && document.getElementById("idCheck") != null && level == 1) {
                    // console.log(level, "cox")
                    prepareMenu()
                } else if (e.code == 'ArrowRight' && Number(document.body.childElementCount) == 6 && document.getElementById("idCheck") != null && level == 1) {
                    if (num_of_text == 1) {
                        var partner;
                        if (choosenHuntPartner == "kinro") {
                            partner = "Кинро"
                            color = "blue"
                        } else if (choosenHuntPartner == "gen") {
                            partner = "Ген"
                            color = "purple"
                        } else {
                            partner = "Гинро"
                            color = "yellow"
                        }
                        document.querySelector("#second_speaker img").src = `img/history/${choosenHuntPartner}.png`
                        if (finalScore.dg == 0) {
                            defineDialogue(color, partner, textGinro, 0)
                        } else if (finalScore.dg <= 10) {
                            defineDialogue(color, partner, textGinro, 1)
                        } else {
                            defineDialogue(color, partner, textGinro, 2)
                        }
                        num_of_text += 1
                    } else if (num_of_text == 2) {
                        defineDialogue("greenyellow", playerName, textMe, 1)
                        num_of_text += 1
                    } else {
                        prepareMenu()
                    }
                }
            })
            
        } else if (!gameMenu) {
            if (!introMenu) {
                prepareMenu()
                introMenu = true
            } else {
                generateGameMap(level)
                createAim()
                introMenu = false
                isGameEnd = false
                playGame = requestAnimationFrame(game)
            }
            
        }
    } else if (level == 2) {
        if (!introMenu) {
            prepareMenu()
            introMenu = true
        } else {
            generateGameMap(level)
            createAim()
            introMenu = false
            isGameEnd = false
            playGame = requestAnimationFrame(game)
        }
    } else if (level == 3) {
        if (!introMenu) {
            introMenu = true
            var num_of_text = 0
            document.body.innerHTML = introDisplay
            document.getElementsByClassName("intro_menu")[0].style.backgroundImage = "url(img/history/week3.jpg)"
            var textMe = [
                "Как обстоят дела в лагере?",
                "Делаю все, что в моих силах. Нам осталось продержаться совсем немного."
            ];
            var textGinro = [
                `Люди в ярости, многие из них не ели уже несколько дней.`,
                `Люди очень недовольны, но пока причин для беспокойства нет.`,
                `Все спокойно, твои усилия не были напрасными.`
            ];
            defineDialogue("greenyellow", playerName, textMe, num_of_text)
            num_of_text += 1
            window.addEventListener("keydown", (e) => {
                if (e.code == 'KeyQ' && Number(document.body.childElementCount) == 6 && document.getElementById("idCheck") != null && level == 3) {
                    // console.log(level, "cox")
                    prepareMenu()
                } else if (e.code == 'ArrowRight' && Number(document.body.childElementCount) == 6 && document.getElementById("idCheck") != null && level == 3) {
                    if (num_of_text == 1) {
                        var partner;
                        if (choosenHuntPartner == "kinro") {
                            partner = "Кинро"
                            color = "blue"
                        } else if (choosenHuntPartner == "gen") {
                            partner = "Ген"
                            color = "purple"
                        } else {
                            partner = "Гинро"
                            color = "yellow"
                        }
                        document.querySelector("#second_speaker img").src = `img/history/${choosenHuntPartner}.png`
                        if (playerCondition.campHunger > 80) {
                            defineDialogue(color, partner, textGinro, 0)
                        } else if (playerCondition.campHunger <= 80 && playerCondition.campHunger >= 30) {
                            defineDialogue(color, partner, textGinro, 1)
                        } else {
                            defineDialogue(color, partner, textGinro, 2)
                        }
                        num_of_text += 1
                    } else if (num_of_text == 2) {
                        defineDialogue("greenyellow", playerName, textMe, 1)
                        num_of_text += 1
                    } else {
                        prepareMenu()
                    }
                }
            })
        } else {
            generateGameMap(level)
            createAim()
            introMenu = false
            isGameEnd = false
            playGame = requestAnimationFrame(game)
        }
    } else if (level == 4) {
        if (!introMenu) {
            prepareMenu()
            introMenu = true
        } else {
            generateGameMap(level)
            createAim()
            introMenu = false
            isGameEnd = false
            playGame = requestAnimationFrame(game)
        }
    } else {
        fullGameEnd()
    }
    
};

createMap();

window.addEventListener("keydown", (e) => {
    if (isPaused && document.getElementById("game-pause-content") != null) {
        if (e.code == "ArrowDown" || e.code == "ArrowUp") {
            var a = document.querySelector("button.pause-button.marked-pause")
            var b = document.querySelector("button.pause-button:not(.marked-pause)")
            a.classList.remove("marked-pause")
            b.classList.add("marked-pause")
            // console.log(a,b)
        } else if (e.code == "Enter") {
            var a = document.querySelector("button.pause-button.marked-pause")
            if (a.id == "pause-continue-id") {
                isPaused = false
            for (var y of duck_arr) {
                // var needId = Number(i.split("-")[1])
                y.spriteSheet.style.animation = "play 0.9s steps(2) infinite"
                y.spriteSheet.style.transition = "top 3s, left 3s"
            }
            var x = document.getElementsByClassName("fox")
            var i;
            for (i = 0; i < x.length;i++) {
                x[i].style.animation = "play1 2.5s steps(2) infinite"
                x[i].style.transition = "right 1s"
            }
             var x = document.getElementById("myAudio");
             x.play();
             document.getElementById("game-pause").remove();
             timerInterval = setInterval(updateCountdown, 1000)
             playGame = requestAnimationFrame(game)
            } else {
                endSession(0)
                window.removeEventListener("keydown", intro_menu_display, false)
                isPaused = false
                createMap()
                // console.log("restart")
            } 
        }
    }
})