const XLSX = require('xlsx');
// const fs = require('fs');

function getColumnData(type) {
  try {
    if(type === 'list') {
      return {
        columns: [
          'rnum', 'platPlc', 'sigunguCd', 'bjdongCd', 'platGbCd', 'bun', 'ji', 'mgmBldrgstPk', 'regstrGbCd', 
          'regstrGbCdNm', 'regstrKindCd', 'regstrKindCdNm', 'newPlatPlc', 'bldNm', 'splotNm', 'block', 'lot', 'bylotCnt', 
          'naRoadCd', 'naBjdongCd', 'naUgrndCd', 'naMainBun', 'naSubBun', 'dongNm', 'mainAtchGbCd', 'mainAtchGbCdNm',
          'platArea', 'archArea', 'bcRat', 'totArea', 'vlRatEstmTotArea', 'vlRat', 'strctCd', 'strctCdNm', 'etcStrct',
          'mainPurpsCd', 'mainPurpsCdNm', 'etcPurps', 'roofCd', 'roofCdNm', 'etcRoof', 'hhldCnt', 'fmlyCnt', 'heit',
          'grndFlrCnt', 'ugrndFlrCnt', 'rideUseElvtCnt', 'emgenUseElvtCnt', 'atchBldCnt', 'atchBldArea', 'totDongTotArea',
          'indrMechUtcnt', 'indrMechArea', 'oudrMechUtcnt', 'oudrMechArea', 'indrAutoUtcnt', 'indrAutoArea', 'oudrAutoUtcnt',
          'oudrAutoArea', 'pmsDay', 'stcnsDay', 'useAprDay', 'pmsnoYear', 'pmsnoKikCd', 'pmsnoKikCdNm', 'pmsnoGbCd', 'pmsnoGbCdNm',
          'hoCnt', 'engrGrade', 'engrRat', 'engrEpi', 'gnBldGrade', 'gnBldCert', 'itgBldGrade', 'itgBldCert', 'crtnDay'
        ],
        header: [
          '순번', '대지위치', '시군구코드', '법정동코드', '대지구분코드', '번', '지', '관리건축물대장PK', '대장구분코드', '대장구분코드명', 
          '대장종류코드', '대장종류코드명', '도로명대지위치', '건물명', '특수지명', '블록', '로트', '외필지수', '새주소도로코드', '새주소법정동코드', '새주소지상지하코드', 
          '새주소본번', '새주소부번', '동명칭', '주부속구분코드', '주부속구분코드명', '대지면적(㎡)', '건축면적(㎡)', '건폐율(%)', '연면적(㎡)', '용적률산정연면적(㎡)', 
          '용적률(%)', '구조코드', '구조코드명', '기타구조', '주용도코드', '주용도코드명', '기타용도', '지붕코드', '지붕코드명', '기타지붕', '세대수(세대)', '가구수(가구)', 
          '높이(m)', '지상층수', '지하층수', '승용승강기수', '비상용승강기수', '부속건축물수', '부속건축물면적(㎡)', '총동연면적(㎡)', '옥내기계식대수(대)', '옥내기계식면적(㎡)', 
          '옥외기계식대수(대)', '옥외기계식면적(㎡)', '옥내자주식대수(대)', '옥내자주식면적(㎡)', '옥외자주식대수(대)', '옥외자주식면적(㎡)', '허가일', '착공일', '사용승인일', 
          '허가번호년', '허가번호기관코드', '허가번호기관코드명', '허가번호구분코드', '허가번호구분코드명', '호수(호)', '에너지효율등급', '에너지절감율', 'EPI점수', '친환경건축물등급', 
          '친환경건축물인증점수', '지능형건축물등급', '지능형건축물인증점수', '생성일자'
        ]
      }
    } else if(type === 'complete') {
      return {
        columns: ['rnum', 'platPlc', 'bldNm', 'chkMthd', 'planChkMthd', 'synthOpin', 'planSynthOpin', 'chkPrdStrtDay', 'chkPrtEndDay'],
        header: ['순번', '대지위치', '건물명', '점검방법', '계획점검방법', '종합의견', '계획종합의견', '점검기간시작일', '점검기간종료일']
      }
    } else if(type === 'target') {
      return {
        columns: ['rnum', 'platPlc', 'bldNm', 'dongNm', 'hhldCnt', 'hoCnt', 'grndFlrCnt', 'ugrndFlrCnt', 'totArea', 'useApprvDay', 'stdDay'],
        header: ['순번', '대지위치', '건물명', '동명', '세대수', '호수', '지상층수', '지하층수', '연면적', '사용승인일', '기준일']
      }
    }
  } catch (error) {
    throw error;
  }
}
// 엑셀 다운로드용 데이터 가공
function makeXLSXData(type, data) {
  try {      
    const columnData = getColumnData(type);
    const { columns, header } = columnData;
    const rows = [];
    rows.push(header);
    data.forEach(d => {
      const row = [];
      columns.forEach(column => {
        row.push(d[column]);
      });
      rows.push(row);
    });
    return rows;

  } catch (error) {
    throw error;
  }
}

// 엑셀 파일 다운로드
async function downloadXLSX(aoa, fileName, callback) {
	try {
		let wb = {};
	  wb.Sheets = {};
	  wb.SheetNames = ['sheet1'];

    let ws = XLSX.utils.aoa_to_sheet(aoa);
    wb.Sheets['sheet1'] = ws;
    
		// xlsx 다운로드 cb
		XLSX.writeFileAsync(`./xlsx/${fileName}`, wb, { bookType:'xlsx', type:'base64' }, (error) => {
      if(error) console.log('엑셀 파일 다운로드에 실패했습니다..', error);
      else callback();
    });
    
		// xlsx 다운로드
		// XLSX.writeFile(wb, `./xlsx/${fileName}`, { bookType:'xlsx', type:'base64' });

		// csv 다운로드
	  // let stream = XLSX.stream.to_csv(ws);
	  // let out = fs.createWriteStream('structure-test');
	  // out.on('open', function (fd) {
	  //   out.write(new Buffer([0xEF, 0xBB, 0xBF]));
	  //   stream.pipe(out);
	  // });

	} catch(error) {
		throw error;
	}
}

exports.downloadXLSX = downloadXLSX;
exports.makeXLSXData = makeXLSXData;