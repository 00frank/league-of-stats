const Types = {
  "OPEN_PORTAL": "open portal",
  "CLOSE_PORTAL": "close portal",
}

export default function portalReducer(state, action) {
  switch (action.type) {
    case Types.OPEN_PORTAL:
      return { isOpen: true, champion: action.champion }
    case Types.CLOSE_PORTAL:
      return { isOpen: false, champion: null }
    default:
      return state;
  }
}

export { Types }
