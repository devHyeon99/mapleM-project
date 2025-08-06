export interface SymbolItem {
  symbol_name: string;
  symbol_icon: string;
  symbol_level: number;
  symbol_growth_value: number;
  symbol_option: string;
}

export interface CharacterSymbol {
  character_class: string;
  arcane_symbol: SymbolItem[];
  authentic_symbol: SymbolItem[];
}
