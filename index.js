const lib = require('./src/lib');
const util = require('./src/util');

(async () => {
  try {
    // TODO: README.md 파일 수정하기

    const { TYPE } = process.env;
    if(!TYPE) {
      console.log('작업시작 명령어를 입력하세요.');
      console.log(`건축물 리스트 가져오기            : npm run structure [시군구코드] [법정동코드]`);
      console.log(`유지관리점검 완료 리스트 가져오기 : npm run inspection_c [시군구코드] [법정동코드]`);
      console.log(`유지관리점검 대상 리스트 가져오기 : npm run inspection_t [시군구코드] [법정동코드]`);
      console.log(`법정동/시군구 엑셀파일 json 데이터로 변환하기 : npm run get_code`);
      return true;
    }
    
    if(TYPE !== 'code') {
      const jobName = TYPE === 'list' ? '건축물 리스트 가져오기' : TYPE === 'complete' ? '유지관리점검 완료 리스트 가져오기' : '유지관리점검 대상 리스트 가져오기';
      console.log(`작업이 시작되었습니다. 작업명: ${jobName}`);
      const params = {
        sigunguCd:  process.argv[2],
        bjdongCd:  process.argv[3],
        platGbCd:  process.argv[4],
        bun:  process.argv[5],
        ji:  process.argv[6],
      }
      let msg = ``;
      msg += params.sigunguCd ? `시군구코드: ${params.sigunguCd}` : ``;
      msg += params.bjdongCd ? ` / 법정동코드: ${params.bjdongCd}` : ``;
      msg += params.platGbCd ? ` / 대지구분코드: ${params.platGbCd}` : ``;
      msg += params.bun ? ` / 번: ${params.bun}` : ``;
      msg += params.ji ? ` / 지: ${params.ji}` : ``;
      console.log(`데이터를 가져오는중입니다. (${msg})`);
  
      // 데이터 가져오기
      const result = await lib.getData(TYPE, params);
      const { items, totalCount } = result.data.response.body;
      if(!items) {
        console.log('데이터가 없습니다.');
        return false;
      }
      console.log(`데이터를 가져왔습니다. (전체 개수: ${totalCount})`);	
  
      console.log(`엑셀파일을 다운로드합니다.`);
      // 데이터 가공
      const xlsxData = util.makeXLSXData(TYPE, items.item);
      // 시간 (파일명 중복 방지)
      const msec = Date.parse(new Date().toString());
      // 파일이름 (폴더/시군구코드-법정동코드_시간)
      const fileName = `${TYPE}/${params.sigunguCd}-${params.bjdongCd}_${msec}.xlsx`;
      // 엑셀파일 다운로드
      await util.downloadXLSX(xlsxData, fileName, () => {
        console.log(`파일이 다운로드 되었습니다. (파일명: ${fileName})`);
      });

    } else {  // 엑셀파일로 json 파일만들기
      util.getCodes();
    }

  } catch(error) {
		console.error(`작업중 문제가 발생했습니다.`);
		console.error(error);
  }
})();