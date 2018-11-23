const XLSX = require('xlsx');
// const fs = require('fs');

// 엑셀 다운로드용 데이터 가공
function makeXLSXData(data) {
  try {
    const columns = ['rnum', 'platPlc', 'sigunguCd', 'bjdongCd', 'platGbCd', 'bun', 'ji', 'mgmBldrgstPk', 'regstrGbCd', 
      'regstrGbCdNm', 'regstrKindCd', 'regstrKindCdNm', 'newPlatPlc', 'bldNm', 'splotNm', 'block', 'lot', 'bylotCnt', 
      'naRoadCd', 'naBjdongCd', 'naUgrndCd', 'naMainBun', 'naSubBun', 'dongNm', 'mainAtchGbCd', 'mainAtchGbCdNm',
      'platArea', 'archArea', 'bcRat', 'totArea', 'vlRatEstmTotArea', 'vlRat', 'strctCd', 'strctCdNm', 'etcStrct',
      'mainPurpsCd', 'mainPurpsCdNm', 'etcPurps', 'roofCd', 'roofCdNm', 'etcRoof', 'hhldCnt', 'fmlyCnt', 'heit',
      'grndFlrCnt', 'ugrndFlrCnt', 'rideUseElvtCnt', 'emgenUseElvtCnt', 'atchBldCnt', 'atchBldArea', 'totDongTotArea',
      'indrMechUtcnt', 'indrMechArea', 'oudrMechUtcnt', 'oudrMechArea', 'indrAutoUtcnt', 'indrAutoArea', 'oudrAutoUtcnt',
      'oudrAutoArea', 'pmsDay', 'stcnsDay', 'useAprDay', 'pmsnoYear', 'pmsnoKikCd', 'pmsnoKikCdNm', 'pmsnoGbCd', 'pmsnoGbCdNm',
      'hoCnt', 'engrGrade', 'engrRat', 'engrEpi', 'gnBldGrade', 'gnBldCert', 'itgBldGrade', 'itgBldCert', 'crtnDay'];
        
    const rows = [];
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
		XLSX.writeFileAsync(`./xlsx/${fileName}`, wb, { bookType:'xlsx', type:'base64' }, () => {
      callback();
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