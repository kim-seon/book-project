const ttbKey = 'ttblte08091534001'

export default async function handler(req, res) {
    const response = fetch(`http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ttbKey}&Query=aladdin&QueryType=Keyword&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`)
    const jsonData = await (await response).json()
    res.status(200).json(jsonData)
}