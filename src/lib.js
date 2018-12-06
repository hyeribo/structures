const axios = require('axios');

// sigunguCd: 	시군구코드 (ex: 11680)
// bjdongCd: 	  법정동코드 (ex: 10300)
// platGbCd: 		대지구분코드
// bun: 				번
// ji: 					지
/**
 * @description 건축물 데이터 가져오기
 */
async function getData(params) {
	try {

		// 시군구코드, 법정동코드는 필수
		if(!params.sigunguCd) throw Error('시군구코드가 없습니다.');
		if(!params.bjdongCd) throw Error('법정동코드가 없습니다.');

		// 전체 데이터 수 구하기
		const totalCountParams = {
			...params,
			numOfRows: 1
		};
		const totalCountUrl = _getUrl(totalCountParams);
		const totalCountResult = await axios.get(totalCountUrl);
		const totalCount = totalCountResult.data.response.body.totalCount;

		// 전체 데이터 구하기
		const dataParams = {
			...params,
			numOfRows: totalCount
		}
		const dataUrl = _getUrl(dataParams);
		const data = await axios.get(dataUrl);
		return data;

	} catch(error) {
		throw error;
	}
};


// sigunguCd: 	시군구코드 (ex: 11680)
// bjdongCd: 	  법정동코드 (ex: 10300)
// platGbCd: 		대지구분코드
// bun: 				번
// ji: 					지
// numOfRows: 	뽑아올 데이터 수
/**
 * @description 건축물 조회용 url 가공하기
 */
function _getUrl(params) {
	const operation = 'getBrTitleInfo';	// 3. 건축물대장 표제부 조회
	const serviceKey = 'ezMpwxbL6wVA3nSWp7m3IvUxLiZRYwuza0P7d0IXEHAgLcROJKm1tep6%2B0LEvjXVu6ZkVdPs2iEsIsebv1T7Ow%3D%3D';	// 서비스 인증키
	let url = `http://apis.data.go.kr/1611000/BldRgstService/${operation}?serviceKey=${serviceKey}`;

	const { sigunguCd, bjdongCd, platGbCd, bun, ji, numOfRows = 1 } = params;

	url += `&sigunguCd=${sigunguCd}`;
	url += `&bjdongCd=${bjdongCd}`;
	url += platGbCd ? `&platGbCd=${platGbCd}` : ``;
	url += bun ? `&bun=${bun}` : ``;
	url += ji ? `&ji=${ji}` : ``;
	url += numOfRows ? `&numOfRows=${numOfRows}` : ``;

	return url;
}

exports.getData = getData;