export interface Uzeltype {
	_id: string
	nomi: string
	description: string
	korikmuddat: string
}

export interface Uzeltypewith {
	_id: string
	nomi: string
	description: string
	korikmuddat: string
	uzellarsoni: number
	tamirdavriotgansoni: number
	tamirgaozqoldisoni: number
	tamiriyaxshi: number
}

export interface UzeltypeDto {
	nomi: string
	description: string
	korikmuddat: string
}
