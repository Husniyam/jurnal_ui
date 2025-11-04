export interface Jurnal {
	_id: string
	lokomotiv: {
		_id: string
		nomi: string
		zavodRaqami: string
	}
	yechilganuzel: {
		_id: string
		uzeltype: {
			_id: string
			nomi: string
			korikmuddat: string
		}
		raqami: string
	}
	yechganXodim: {
		_id: string
		ism: string
		familiya: string
	}
	tamirTuri: string
	yechilganSana: Date
	qoyilganuzel: {
		_id: string
		uzeltype: {
			_id: string
			nomi: string
			korikmuddat: string
		}
		raqami: string
	}
	qoyganXodim: {
		_id: string
		ism: string
		familiya: string
	}
	qoyilganSana: Date
	status: 'Tamirda' | 'Ish holatida'
}

export interface CreateJurnalDto {
	lokomotiv: string
	yechilganuzel: string
	yechganXodim: string
	tamirTuri: string
	yechilganSana: Date
	qoyilganuzel?: string
	qoyganXodim?: string
	qoyilganSana?: Date
	status: string // 'Tamirda' | 'Ish holatida'
}
