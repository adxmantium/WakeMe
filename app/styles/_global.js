// /styles/alarm.js

export const white = '#fff'
export const error = 'firebrick'
export const flatblack = '#202020'

export const header_height = 55

export const darkTheme = {
  shade1: '#29648A',
  shade2: '#2E9CCA',
  shade3: '#AAABB8',
  shade4: '#464866',
  shade5: '#25274D',
  shade6: '#42468a',
}

export const lightTheme = {
  shade1: '#FEFFFF',
  shade2: '#DEF2F1',
  shade3: '#3AAFA9',
  shade4: '#2B7A78',
  shade5: '#17252A',
}

export const natureTheme = {
  shade1: '#F7F9FB',
  shade2: '#8FC1E3',
  shade3: '#5085A5',
  shade4: '#31708E',
  shade5: '#687864',
}


// returns object with all padding sides
// if rt, bt, and lt are undefined, then use tp as default to mimic css ex: padding: 10
export const _padding = (tp, rt, bt, lt) => ({
  paddingTop: tp,
  paddingRight: rt >= 0 ? rt : tp,
  paddingBottom: bt >= 0 ? bt : tp,
  paddingLeft: lt >= 0 ? lt : tp,
});

export const _margin = (tp, rt, bt, lt) => ({
  marginTop: tp,
  marginRight: rt >= 0 ? rt : tp,
  marginBottom: bt >= 0 ? bt : tp,
  marginLeft: lt >= 0 ? lt : tp,
});

export const _borderRadius = (tl, tr, br, bl) => ({
  borderTopLeftRadius: tl,
  borderTopRightRadius: tr >= 0 ? tr : tl,
  borderBottomRightRadius: br >= 0 ? br : tl,
  borderBottomLeftRadius: bl >= 0 ? bl : tl,
});

export const _border = (width, color, type) => ({
  borderWidth: width || 1,
  borderColor: color || _gray,
  borderStyle: type || 'solid',
});

export const _boxShadow = (sc, sof, sop, sr) => ({
  shadowColor: sc || '#000',
  shadowOffset: sof || { width: 0, height: 2 },
  shadowOpacity: sop || 0.8,
  shadowRadius: sr || 2,
});

export const _simpleBtn = (color) => ({
  backgroundColor: color || _plexGreen,
  ..._padding(15, 0, 15, 0),
  ..._borderRadius(3),
});

export const _simpleBtnText = (color) => ({
  color: color || _white,
  textAlign: 'center',
  fontSize: 20,
});
