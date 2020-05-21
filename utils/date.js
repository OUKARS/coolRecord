export const  formatDate  = (date)=>{
	let year = date.getFullYear()
	let month = date.getMonth()+1
	let day = date.getDate()
	let formatdate = year+'-'+month+'-'+day
	return formatdate
}

