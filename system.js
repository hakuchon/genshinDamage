const errorMes = document.getElementById('errorMes');

const manual_Input = document.getElementById('manual-input');
const manualButton = document.getElementById('manualButton');

const autoButton = document.getElementById('autoInput');

const charStaArea = document.getElementById('charStatusArea');

//基礎ステ
const normalAtt = document.getElementById('normalAtt');
const normalDef = document.getElementById('normalDef');
const normalHP = document.getElementById('normalHP');

//現ステ
const currentAtt = document.getElementById('currentAtt');
const currentDef = document.getElementById('currentDef');
const currentHP = document.getElementById('currentHP');

//会心ステ
const critRate = document.getElementById('critRate');
const critDamage = document.getElementById('critDamage');

//熟知、チャージ
const elemBonus = document.getElementById('elemBonus');
const chargePar = document.getElementById('chargePar');

//ダメージバフ
const fireDamBonus = document.getElementById('fireDamBonus');
const waterDamBonus = document.getElementById('waterDamBonus');
const iceDamBonus = document.getElementById('iceDamBonus');
const thunderDamBonus = document.getElementById('thunderDamBonus');
const windDamBonus = document.getElementById('windDamBonus');
const rockDamageBonus = document.getElementById('rockDamageBonus');
const grassDamBonus = document.getElementById('grassDamBonus');
const physicsDamBonus = document.getElementById('physicsDamBonus');

//天賦レベル
let talentValue;
const normalAttackLv = document.getElementById('normalAttack');
const skillAttackLv = document.getElementById('skillAttack');
const ult = document.getElementById('Ult');

let UID = '';
let charName = '';
let data;
let charLevel = 1;

let url = 'charData/';

let enemyData = {
  "Level" : 90,
  "hilichurl" : {
    "elemResist" : {
      "fire" : 10, // "fire"
      "water" : 10, // "water"
      "ice" : 10, // "ice"
      "thunder" : 10, // "thunder"
      "grass" : 10, // "grass"
      "wind" : 10, // "wind"
      "rock" : 10, // "rock"
      "physics" : 10, // "physics"
    },
  },
}

function manualInput()//手入力欄のオンオフ
{
  manual_Input.style.display = 'block';
  manualButton.style.display = 'none';
  autoButton.style.display ='block';
}

function autoInput()
{
  autoButton.style.display = 'none';
  manualButton.style.display = 'block';
  manual_Input.style.display = 'none';
}

function getInputValue()//UIDの取得
{
  let inputUID = document.getElementById('UIDArea');
  let inputCharName = document.getElementById('charName');
  UID = inputUID.value;
  charName = inputCharName.value;

  //UID = '853876244';
  if (UID.length < 9 || UID.length > 10)
  {
    errorMes.innerText = 'ERROR : UIDの桁数が間違っています';
    return;
  }
  else if (charName.length < 1)
  {
    errorMes.innerText = 'ERROR : キャラ名を日本語で入力してください';
    return;
  }
  else //成功
  {
    errorMes.innerText = '';
    console.log(UID,charName);
    requestData();
    readCharJson(charName);
  }
}

function requestData()//EnkaAPIの取得
{
  let UserApiUrl = 'https://corsproxy.io/?' + encodeURI(`https://genshin-api.kuroneko6423.com/api/genshindata/?uid=${UID}&scoretype=ATTACK&charaName=${encodeURIComponent(charName)}`);
  console.log(UserApiUrl);
  let request = new XMLHttpRequest();

  request.open('GET', UserApiUrl, true)
  request.responseType = 'json';
  
  request.onload = function(){
    data = this.response;
    console.log(data)
    //create();
    dataSet();
  }
  
  request.send();
}

function readCharJson()
{
  url = url + charName + '.json';
  console.log(url);
  fetch (url)
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    talentValue = result;
  })
  .catch((e) => {
    console.log(e)
  })

  talentValue = {
    "Name":"放浪者",
    "status":{
  
    },
    "talentAttType":{
      "normalAttack":"Attack",
      "skillAttack":"Attack",
      "ult":"Attack"
    },
    "skillLvs":{
      "normalAttack":{
        "First":{
          "1":[68.7],
          "2":[74.3],
          "3":[79.9],
          "4":[87.9],
          "5":[93.5],
          "6":[99.9],
          "7":[108.7],
          "8":[117.5],
          "9":[126.2],
          "10":[135.8],
          "11":[145.4]
        },
        "Second":{
          "1":[65],
          "2":[70.3],
          "3":[75.6],
          "4":[83.2],
          "5":[88.5],
          "6":[94.5],
          "7":[102.8],
          "8":[111.1],
          "9":[119.4],
          "10":[128.5],
          "11":[137.6]
        },
        "Third":{
          "1":[47.6,47.6],
          "2":[51.5,51.5],
          "3":[55.4,55.4],
          "4":[60.9,60.9],
          "5":[64.8,64.8],
          "6":[69.3,69,3],
          "7":[75.3,75.3],
          "8":[81.4,81.4],
          "9":[87.5,87.5],
          "10":[94.2,94.2],
          "11":[100.8,100.8]
        },
        "charge":{
          "1":[132.1],
          "2":[142],
          "3":[151.9],
          "4":[165.1],
          "5":[175],
          "6":[184.9],
          "7":[198.1],
          "8":[211.3],
          "9":[224.5],
          "10":[237.7],
          "11":[251]
        },
        "falling":{
          "1":[56.8],
          "2":[61.5],
          "3":[66.1],
          "4":[72.7],
          "5":[77.3],
          "6":[82.6],
          "7":[89.9],
          "8":[97.1],
          "9":[104.4],
          "10":[112.3],
          "11":[120.3]
        },
        "fallLow":{
          "1":[114],
          "2":[123],
          "3":[132],
          "4":[145],
          "5":[155],
          "6":[165],
          "7":[180],
          "8":[194],
          "9":[209],
          "10":[225],
          "11":[240]
        },
        "FallHigh":{
          "1":[142],
          "2":[153],
          "3":[165],
          "4":[182],
          "5":[193],
          "6":[206],
          "7":[224],
          "8":[243],
          "9":[261],
          "10":[281],
          "11":[300]
      }
      },
      "skillAttack":{
        "":{
          "1":[],
          "2":[],
          "3":[],
          "4":[],
          "5":[],
          "6":[],
          "7":[],
          "8":[],
          "9":[],
          "10":[],
          "11":[],
          "12":[],
          "13":[]
        }
      },
      "ult":{
        "1":[147.2,147.2,147.2,147.2,147.2],
        "2":[158.2,158.2,158.2,158.2,158.2],
        "3":[169.3,169.3,169.3,169.3,169.3],
        "4":[184,184,184,184,184],
        "5":[195,195,195,195,195],
        "6":[206.1,206.1,206.1,206.1,206.1],
        "7":[220.8,220.8,220.8,220.8,220.8],
        "8":[235.5,235.5,235.5,235.5,235.5],
        "9":[250.2,250.2,250.2,250.2,250.2],
        "10":[265,265,265,265,265],
        "11":[279.7,279.7,279.7,279.7,279.7],
        "12":[294.4,294.4,294.4,294.4,294.4],
        "13":[312.8,312.8,312.8,312.8,312.8]
      }
    }
  }
}

function create()
{
  dataSet();
}

function dataSet()
{
  normalAtt.value = data["Character"]["Base"]["攻撃力"];
  normalDef.value = data["Character"]["Base"]["防御力"];
  normalHP.value = data["Character"]["Base"]["HP"];

  currentAtt.value = data["Character"]["Status"]["攻撃力"];
  currentDef.value = data["Character"]["Status"]["防御力"];
  currentHP.value = data["Character"]["Status"]["HP"];

  critRate.value = data["Character"]["Status"]["会心率"];
  critDamage.value = data["Character"]["Status"]["会心ダメージ"];

  elemBonus.value = data["Character"]["Status"]["元素熟知"];
  chargePar.value = data["Character"]["Status"]["元素チャージ効率"];

  normalAttackLv.value = data["Character"]["Talent"]["通常"];
  skillAttackLv.value = data["Character"]["Talent"]["スキル"];
  ult.value = data["Character"]["Talent"]["爆発"];

  charLevel = data["Character"]["Level"]
}

function NCalc()//最終計算
{
  let Attack;
  let defense;
  let HP;

  let critRate = 5;
  let critDamage = 1;

  let DamageBuff = 1 + 0 / 100;

  let talentNLvl = 1;
  let talentSLvl = 1;
  let talentULvl = 1;
  let AttackElementN = talentValue["skillLevels"]["normalAttack"]["Element"];
  let AttackElementS = talentValue["skillLevels"]["skillAttack"]["Element"];
  let AttackElementU = talentValue["skillLevels"]["ult"]["Element"];

  let buff = 0;
  let SpecialBuff = 1;
  let AddRealDam = 0;
  let elemCorr = 1;



  function Att()
  {
    Attack = data["Character"]["Status"]["攻撃力"] + buff;
  }

  let enLevel = enemyData[Level];
  let EnemyDefense;
  let IgDefensePar = 0;

  function enemyDefense()
  {
    let defDeBuffPar = 0; // 敵防御デバフ量
    if (defDeBuffPar < -100)
    {
      defDeBuffPar = -100;
    }
    
    return EnemyDefense = (charLevel + 100) / ((1 - (IgDefensePar / 100)) * (1 - (defDeBuffPar / 100)) * (enLevel) + charLevel);
  }

  function enemyElemDefense()
  {
    let elemDam = 1;
    let elemDef = enemyData["hilichurl"]["elemResist"][AttackElementN];

    if (0 <= elemDef && elemDef < 0.75)
    {
      return elemDam = 1 - elemDef;
    }
    else if (elemDef < 0)
    {
      return elemDam = 1 - (elemDef / 2);
    }
    else if (elemDef > 0.75)
    {
      return elemDam = 1 / (4 * elemDef + 1);
    }
  }
  
  //ダメージ = (攻撃力 × 天賦倍率 × 特殊乗算 + 実数ダメージ加算) × ダメージバフ補正 × 会心補正 × 元素反応補正 × 敵の防御補正 × 敵の元素耐性補正 
  let Damage = (Attack * talentValue["skillLevels"]["normalAttack"]["First"]["talentNLvl"] * SpecialBuff + AddRealDam) * DamageBuff * critDamage * enemyDefense() * enemyElemDefense();
  console.log(Damage);
}