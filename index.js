const lib = require('./src/lib');
const util = require('./src/util');

(async () => {
  try {
		console.log('작업이 시작되었습니다.');
    const pageSize = 1000;
    const params = {
      pageSize,
      pageNumber:  process.argv[2],
      sigunguCd:  process.argv[3],
      bjdongCd:  process.argv[4],
      platGbCd:  process.argv[5],
      bun:  process.argv[6],
      ji:  process.argv[7],
    }
    let msg = ``;
    msg += params.sigunguCd ? `시군구코드: ${params.sigunguCd}` : ``;
    msg += params.bjdongCd ? ` / 법정동코드: ${params.bjdongCd}` : ``;
    msg += params.platGbCd ? ` / 대지구분코드: ${params.platGbCd}` : ``;
    msg += params.bun ? ` / 번: ${params.bun}` : ``;
    msg += params.ji ? ` / 지: ${params.ji}` : ``;
		console.log(`데이터를 가져오는중입니다. (${msg})`);

    // 데이터 가져오기
    const result = await lib.getData(params);
    const { items, numOfRows, pageNo, totalCount } = result.data.response.body;
    if(!items) {
			console.log('데이터가 없습니다.');
			return false;
		}
    console.log(`데이터를 가져왔습니다. (페이지: ${pageNo} / 개수: ${items.item.length} / 전체 개수: ${totalCount} / 전체 페이지: ${Math.ceil(totalCount/pageSize)})`);	

		console.log(`엑셀파일을 다운로드합니다.`);
    // 데이터 가공
    const xlsxData = util.makeXLSXData(items.item);
		// 파일이름 (structure-_페이지_데이터수)
		const msec = Date.parse(new Date().toString());	// 시간 (파일명 중복 방지)
    const fileName = `structure-size_${pageSize}_page_${pageNo}_${msec}.xlsx`;
    // 엑셀파일 다운로드
    await util.downloadXLSX(xlsxData, fileName, () => {
      console.log(`파일이 다운로드 되었습니다. (파일명: ${fileName})`);
    });

  } catch(error) {
		console.error(`실행중 문제가 발생했습니다.`);
		console.error(error);
  }
})();