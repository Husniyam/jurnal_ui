export interface Uzel {
	_id: string
	uzeltype: {
		_id: string
		nomi: string
		korikmuddat: string
	}
	raqami: string
	holati: string
	sex: {
		_id: string
		nomi: string
	}
	lokomotiv: {
		_id: string
		nomi: string
		zavodRaqami: string
	}
	xodim: string
	tamirturi: string
	sana: Date
}

// export interface UzelDto {
// 	uzeltype: string
// 	raqami: string
// 	holati: string
// 	sex: {
// 		_id: string
// 		nomi: string
// 	}
// 	lokomotiv: {
// 		_id: string
// 		nomi: string
// 		zavodRaqami: string
// 	}
// 	xodim: string
// 	tamirturi: string
// 	sana: Date
// }

export interface CreateUzelDto {
	uzeltype: string
	raqami: string
	holati: string
	sex: string
	lokomotiv: string
}
