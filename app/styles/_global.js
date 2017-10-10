// /styles/alarm.js

export const white = '#fff'
export const error = 'firebrick'


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
