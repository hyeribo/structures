const axios = require('axios');

// pageSize: 		리스트 수
// pageNumber: 	1. 페이지 번호 (기본 1)
// sigunguCd: 	2. 시군구코드 (ex: 11680)
// bjdongCd: 	  3. 법정동코드 (ex: 10300)
// platGbCd: 		4. 대지구분코드
// bun: 				5. 번
// ji: 					6. 지
/**
 * @description 건축물 데이터 가져오기
 */
async function getData(params) {
	try {
		const operation = 'getBrTitleInfo';	// 3. 건축물대장 표제부 조회
		const serviceKey = 'ezMpwxbL6wVA3nSWp7m3IvUxLiZRYwuza0P7d0IXEHAgLcROJKm1tep6%2B0LEvjXVu6ZkVdPs2iEsIsebv1T7Ow%3D%3D';	// 서비스 인증키
		let url = `http://apis.data.go.kr/1611000/BldRgstService/${operation}?serviceKey=${serviceKey}`;

		const { pageSize, pageNumber = 1, sigunguCd, bjdongCd, platGbCd, bun, ji } = params;

		// 시군구코드, 법정동코드는 필수
		if(!sigunguCd) throw Error('시군구코드가 없습니다.');
		if(!bjdongCd) throw Error('법정동코드가 없습니다.');

		url += `&sigunguCd=${sigunguCd}`;
		url += `&bjdongCd=${bjdongCd}`;

		url += platGbCd ? `&platGbCd=${platGbCd}` : ``;
		url += bun ? `&bun=${bun}` : ``;
		url += ji ? `&ji=${ji}` : ``;

		url += pageSize ? `&numOfRows=${pageSize}` : ``;
		url += pageNumber ? `&pageNo=${pageNumber}` : ``;

		// 결과
		return await axios.get(url);

	} catch(error) {
		throw error;
	}
};

exports.getData = getData;