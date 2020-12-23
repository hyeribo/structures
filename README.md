# structures
국내 건축물들의 정보를 검색하여 엑셀파일로 다운로드합니다.

## 시작하기
package.json에 명시된 노드 모듈들을 설치합니다.

```
npm install
```


## 엑셀파일 다운로드하기
- `시군구코드`와 `법정동코드`는 필수입니다.
- ``npm start`` 명령어를 입력하시면 사용가능한 명령어 리스트를 볼 수 있습니다.

### 1. 건축물 리스트
```
cross-env TYPE=list node index.js [시군구코드] [법정동코드] [대지구분코드] [번] [지]
npm run structure [시군구코드] [법정동코드] [대지구분코드] [번] [지]
```
- 결과파일은 **xlsx/list**에 저장됩니다.

### 2. 유지관리 점검접수보고 리스트
```
cross-env TYPE=complete node index.js [시군구코드] [법정동코드] [대지구분코드] [번] [지]
```
- 결과파일은 **xlsx/complete**에 저장됩니다.

### 3. 유지관리 접수대상건축물 리스트
```
cross-env TYPE=target node index.js [시군구코드] [법정동코드] [대지구분코드] [번] [지]
```
- 결과파일은 **xlsx/target**에 저장됩니다.


### 추가사항
TYPE=[type] 뒤에 SELECT=Y 를 넣으면, src/util.js에서 설정한 필드의 데이터만 다운로드 할 수 있습니다.

### 4. 한국행정구역분류 xls 파일로 시군구/법정동 json 파일 다운로드
```
npm run get_code
```
- 변환할 xls 파일은 **xlsx/code/code.xls** 로 저장해야합니다.
- 변환된 json 파일은 **xlsx/code/code_result.json** 에 저장됩니다.
- code.xls 파일에는 `법정동코드 연계 자료분석용` 시트가 있어야하며, 나머지 시트는 삭제하는것이 좋습니다.
- `법정동코드 연계 자료분석용` 시트의 1열의 타이틀은 삭제하고, **A1** 셀에는 `시도` 가 위치해야합니다.
- 파일은 [이곳](https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/CommonBoardList.do?gubun=1&strCategoryNameCode=019&strBbsId=kascrr&categoryMenu=014) 에서 다운받을수 있습니다.
