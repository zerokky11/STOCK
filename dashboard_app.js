const DEFAULT_CONFIG = {
  appStatusKey: "main",
  historyLimit: 120,
  diagnosticsLimit: 12,
  validationLimit: 12,
  tables: {
    buySignals: "buy_signals",
    sellSignals: "sell_signals",
    risingSectorRows: "rising_sector_rows",
    earlyDetectionRows: "early_detection_rows",
    focusedWatchlistState: "focused_watchlist_state",
    candidatePromotions: "candidate_promotions",
    candidateDemotions: "candidate_demotions",
    tradeHistory: "trade_history",
    appStatus: "app_status",
    signalSettings: "signal_settings",
    signalPresets: "signal_presets",
    validationEvents: "validation_events",
    runtimeDiagnostics: "runtime_diagnostics",
    sessionEvents: "session_events",
    sessionReports: "session_reports",
    lastMarket: "rising_stocks_last_market",
  },
};

const BUILT_IN_PRESETS = [
  {
    preset_name: "opening_aggressive",
    label: "장초반 공격형",
    description: "최근 상승 속도와 RVOL을 빠르게 읽어 초반 강한 움직임을 먼저 포착하는 추천값입니다.",
    reason: "장초반에는 변동성이 커서 짧은 비교 구간으로 급등을 먼저 확인합니다.",
    compare_window_minutes: 1,
    surge_pct_threshold: 2.2,
    min_trade_value_eok: 80,
    min_signal_score: 68,
    trailing_stop_pct: 1.1,
    take_profit_pct: 3.2,
    stop_loss_pct: -2.0,
    rvol_threshold: 1.8,
    turnover_ratio_threshold: 0.003,
    broad_scan_window_minutes: 2,
    candidate_threshold: 61,
    early_surge_threshold: 1.2,
    early_rvol_threshold: 1.35,
    early_turnover_threshold: 0.001,
    sector_leader_sensitivity: 1.15,
    confirmed_breakout_sensitivity: 0.95,
    confirmed_momentum_sensitivity: 0.95,
    candidate_quality_threshold: 58,
    overextension_penalty_strength: 0.9,
    tail_risk_penalty_strength: 0.95,
    recent_failure_penalty_strength: 1.0,
    focused_promotion_threshold: 64,
    candidate_expiry_minutes: 8,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
  },
  {
    preset_name: "opening_conservative",
    label: "장초반 보수형",
    description: "초반 노이즈를 줄이기 위해 최근 상승률, RVOL, 자금 유입 비율을 더 엄격하게 보는 추천값입니다.",
    reason: "장초반은 변동성이 커서 상승률과 상대 거래 강도 기준을 조금 더 높였습니다.",
    compare_window_minutes: 1,
    surge_pct_threshold: 3.0,
    min_trade_value_eok: 150,
    min_signal_score: 74,
    trailing_stop_pct: 1.2,
    take_profit_pct: 3.6,
    stop_loss_pct: -2.0,
    rvol_threshold: 2.2,
    turnover_ratio_threshold: 0.004,
    broad_scan_window_minutes: 2,
    candidate_threshold: 66,
    early_surge_threshold: 1.4,
    early_rvol_threshold: 1.55,
    early_turnover_threshold: 0.0012,
    sector_leader_sensitivity: 1.0,
    confirmed_breakout_sensitivity: 1.05,
    confirmed_momentum_sensitivity: 1.05,
    candidate_quality_threshold: 64,
    overextension_penalty_strength: 1.15,
    tail_risk_penalty_strength: 1.1,
    recent_failure_penalty_strength: 1.05,
    focused_promotion_threshold: 71,
    candidate_expiry_minutes: 8,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
  },
  {
    preset_name: "intraday_base",
    label: "장중 기본형",
    description: "장중에는 최근 3분 상승률과 상대 거래 강도를 함께 보는 기본 추천값입니다.",
    reason: "장중은 노이즈를 줄이기 위해 3분 기준과 상대 거래 강도를 함께 봅니다.",
    compare_window_minutes: 3,
    surge_pct_threshold: 2.8,
    min_trade_value_eok: 120,
    min_signal_score: 70,
    trailing_stop_pct: 1.2,
    take_profit_pct: 3.5,
    stop_loss_pct: -2.0,
    rvol_threshold: 2.0,
    turnover_ratio_threshold: 0.0025,
    broad_scan_window_minutes: 3,
    candidate_threshold: 63,
    early_surge_threshold: 1.4,
    early_rvol_threshold: 1.45,
    early_turnover_threshold: 0.0012,
    sector_leader_sensitivity: 1.0,
    confirmed_breakout_sensitivity: 1.0,
    confirmed_momentum_sensitivity: 1.0,
    candidate_quality_threshold: 61,
    overextension_penalty_strength: 1.0,
    tail_risk_penalty_strength: 1.0,
    recent_failure_penalty_strength: 1.0,
    focused_promotion_threshold: 67,
    candidate_expiry_minutes: 10,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
  },
  {
    preset_name: "late_conservative",
    label: "후반 보수형",
    description: "후반에는 추격 진입을 줄이기 위해 turnover와 고가권 유지력을 더 엄격하게 보는 추천값입니다.",
    reason: "후반은 추격 진입을 줄이기 위해 자금 유입 비율과 고가권 유지 기준을 더 엄격하게 둡니다.",
    compare_window_minutes: 5,
    surge_pct_threshold: 2.0,
    min_trade_value_eok: 150,
    min_signal_score: 72,
    trailing_stop_pct: 1.0,
    take_profit_pct: 3.0,
    stop_loss_pct: -1.8,
    rvol_threshold: 1.6,
    turnover_ratio_threshold: 0.002,
    broad_scan_window_minutes: 5,
    candidate_threshold: 68,
    early_surge_threshold: 1.6,
    early_rvol_threshold: 1.6,
    early_turnover_threshold: 0.001,
    sector_leader_sensitivity: 0.9,
    confirmed_breakout_sensitivity: 1.1,
    confirmed_momentum_sensitivity: 1.1,
    candidate_quality_threshold: 65,
    overextension_penalty_strength: 1.25,
    tail_risk_penalty_strength: 1.15,
    recent_failure_penalty_strength: 1.1,
    focused_promotion_threshold: 72,
    candidate_expiry_minutes: 7,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
  },
  {
    preset_name: "test_relaxed_capture",
    label: "테스트용 넓게 포착",
    description: "후보 생성과 focused 승격을 넓게 열어 실시간 감지 흐름을 확인하는 테스트용 preset입니다. false positive가 늘 수 있으므로 실전 판단 기준으로는 바로 쓰지 않습니다.",
    reason: "테스트 전용 · 후보 많이 잡힘 · 과열 종목도 일부 포함될 수 있음",
    compare_window_minutes: 2,
    surge_pct_threshold: 1.6,
    min_trade_value_eok: 120,
    min_signal_score: 58,
    trailing_stop_pct: 1.2,
    take_profit_pct: 3.5,
    stop_loss_pct: -2.0,
    rvol_threshold: 1.3,
    turnover_ratio_threshold: 0.0010,
    broad_scan_window_minutes: 3,
    candidate_threshold: 48,
    early_surge_threshold: 1.0,
    early_rvol_threshold: 1.15,
    early_turnover_threshold: 0.0006,
    sector_leader_sensitivity: 0.75,
    confirmed_breakout_sensitivity: 0.85,
    confirmed_momentum_sensitivity: 0.85,
    candidate_quality_threshold: 46,
    overextension_penalty_strength: 1.0,
    tail_risk_penalty_strength: 1.0,
    recent_failure_penalty_strength: 1.0,
    focused_promotion_threshold: 52,
    candidate_expiry_minutes: 18,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
    regime_tags: ["test_mode"],
    regime_note: "테스트 전용 · 후보 많이 잡힘 · 과열 종목도 일부 포함될 수 있음",
  },
  {
    preset_name: "choppy_day_safe",
    label: "휩쏘 장세 안전형",
    description: "후보 품질과 RVOL 기준을 조금 더 엄격하게 보면서 흔들림이 큰 장에서 false positive를 줄이기 위한 preset입니다.",
    reason: "휩쏘가 많은 장에서는 과열 추격과 약한 후보를 덜 올리기 위해 품질 기준과 감점을 더 엄격하게 보는 편이 유리합니다.",
    compare_window_minutes: 3,
    surge_pct_threshold: 3.1,
    min_trade_value_eok: 120,
    min_signal_score: 74,
    trailing_stop_pct: 0.9,
    take_profit_pct: 2.8,
    stop_loss_pct: -1.7,
    rvol_threshold: 2.15,
    turnover_ratio_threshold: 0.0032,
    broad_scan_window_minutes: 3,
    candidate_threshold: 67,
    early_surge_threshold: 1.45,
    early_rvol_threshold: 1.65,
    early_turnover_threshold: 0.0013,
    sector_leader_sensitivity: 0.95,
    confirmed_breakout_sensitivity: 1.1,
    confirmed_momentum_sensitivity: 1.08,
    candidate_quality_threshold: 67,
    overextension_penalty_strength: 1.25,
    tail_risk_penalty_strength: 1.2,
    recent_failure_penalty_strength: 1.1,
    focused_promotion_threshold: 72,
    candidate_expiry_minutes: 8,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
    regime_tags: ["choppy_whipsaw", "risk_off_fade"],
    regime_note: "휩쏘가 잦거나 하락 압력이 강한 장에서 false positive를 줄이는 쪽에 맞춘 preset입니다.",
  },
  {
    preset_name: "leadership_focus",
    label: "리더 섹터 집중형",
    description: "섹터 동조와 리더 후보를 조금 더 빠르게 잡아 narrow leadership이나 sector rotation 장세에 맞춘 preset입니다.",
    reason: "주도 섹터가 분명한 장에서는 섹터 리더 민감도와 초기 전환 속도를 조금 더 높게 보는 편이 유리합니다.",
    compare_window_minutes: 2,
    surge_pct_threshold: 2.4,
    min_trade_value_eok: 100,
    min_signal_score: 69,
    trailing_stop_pct: 1.1,
    take_profit_pct: 3.4,
    stop_loss_pct: -1.9,
    rvol_threshold: 1.95,
    turnover_ratio_threshold: 0.0028,
    broad_scan_window_minutes: 2,
    candidate_threshold: 62,
    early_surge_threshold: 1.15,
    early_rvol_threshold: 1.4,
    early_turnover_threshold: 0.0011,
    sector_leader_sensitivity: 1.25,
    confirmed_breakout_sensitivity: 0.96,
    confirmed_momentum_sensitivity: 0.94,
    candidate_quality_threshold: 60,
    overextension_penalty_strength: 0.95,
    tail_risk_penalty_strength: 1.0,
    recent_failure_penalty_strength: 1.0,
    focused_promotion_threshold: 65,
    candidate_expiry_minutes: 9,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
    regime_tags: ["sector_rotation", "narrow_leadership", "broad_risk_on"],
    regime_note: "주도 섹터가 뚜렷하고 후보가 섹터 중심으로 모일 때 참고하기 좋은 preset입니다.",
  },
  {
    preset_name: "breakout_day_aggressive",
    label: "돌파 장세 공격형",
    description: "장초반 갭 모멘텀이나 broad risk-on, late trend day처럼 추세 지속성이 높은 날에 더 적극적으로 후보를 올리는 preset입니다.",
    reason: "추세가 길게 이어지는 장에서는 돌파와 모멘텀 민감도를 조금 높여도 노이즈보다 기회를 더 잘 살릴 수 있습니다.",
    compare_window_minutes: 2,
    surge_pct_threshold: 2.3,
    min_trade_value_eok: 100,
    min_signal_score: 67,
    trailing_stop_pct: 1.2,
    take_profit_pct: 3.8,
    stop_loss_pct: -2.1,
    rvol_threshold: 1.9,
    turnover_ratio_threshold: 0.0026,
    broad_scan_window_minutes: 2,
    candidate_threshold: 60,
    early_surge_threshold: 1.1,
    early_rvol_threshold: 1.35,
    early_turnover_threshold: 0.001,
    sector_leader_sensitivity: 1.1,
    confirmed_breakout_sensitivity: 0.92,
    confirmed_momentum_sensitivity: 0.92,
    candidate_quality_threshold: 58,
    overextension_penalty_strength: 0.88,
    tail_risk_penalty_strength: 0.95,
    recent_failure_penalty_strength: 0.95,
    focused_promotion_threshold: 63,
    candidate_expiry_minutes: 10,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
    regime_tags: ["opening_gap_momentum", "late_trend_day", "broad_risk_on"],
    regime_note: "장초반 갭 모멘텀이나 추세 지속성이 높은 날에 조금 더 빠르게 후보와 신호를 읽기 위한 preset입니다.",
  },
];

const SETTINGS_FIELDS = [
  {
    key: "broad_scan_window_minutes",
    inputId: "broadScanWindowMinutes",
    label: "스캔 비교 구간",
    section: "scan",
    type: "minutes",
    shortHelp: "전체 탐지층이 최근 흐름을 읽을 시간 범위입니다.",
    detailHelp: "짧을수록 새로 살아나는 종목에 빨리 반응하고, 길수록 노이즈를 줄입니다.",
  },
  {
    key: "candidate_threshold",
    inputId: "candidateThreshold",
    label: "후보 승격 기준점",
    section: "scan",
    type: "score",
    shortHelp: "이 점수를 넘으면 집중 감시 후보로 올립니다.",
    detailHelp: "값이 높을수록 후보 수는 줄고, 낮추면 더 많은 종목을 집중 감시 풀에 올립니다.",
  },
  {
    key: "early_surge_threshold",
    inputId: "earlySurgeThreshold",
    label: "초기 상승률 기준",
    section: "scan",
    type: "pct1",
    shortHelp: "초기 포착 단계에서 최근 상승 속도를 보는 기준입니다.",
    detailHelp: "이미 많이 오른 종목만 쫓지 않도록, 막 강도가 붙는 초입을 먼저 포착하는 데 씁니다.",
  },
  {
    key: "early_rvol_threshold",
    inputId: "earlyRvolThreshold",
    label: "초기 RVOL 기준",
    section: "scan",
    type: "number2",
    shortHelp: "평소보다 거래가 얼마나 빨리 늘었는지 보는 스캔용 기준입니다.",
    detailHelp: "값을 낮추면 더 이른 후보를 보고, 높이면 거래가 확실히 붙은 종목만 남깁니다.",
  },
  {
    key: "early_turnover_threshold",
    inputId: "earlyTurnoverThreshold",
    label: "초기 turnover 기준",
    section: "scan",
    type: "ratioPct",
    shortHelp: "종목 크기 대비 자금 유입이 초기부터 붙는지 보는 기준입니다.",
    detailHelp: "절대 거래대금보다 상대 강도를 먼저 보도록 만든 스캔용 기준입니다.",
  },
  {
    key: "sector_leader_sensitivity",
    inputId: "sectorLeaderSensitivity",
    label: "섹터 선도 민감도",
    section: "scan",
    type: "number2",
    shortHelp: "같은 섹터에서 먼저 움직이는 종목을 얼마나 민감하게 볼지 정합니다.",
    detailHelp: "값이 높을수록 섹터 동조 시작을 더 빨리 후보로 끌어올립니다.",
  },
  {
    key: "surge_pct_threshold",
    inputId: "surgePctThreshold",
    label: "급등 기준",
    section: "signal",
    type: "pct1",
    shortHelp: "최근 비교 구간 동안 이 이상 오르면 급등 후보로 봅니다.",
    detailHelp: "값이 낮으면 신호가 많아지고, 높이면 더 강한 움직임만 남습니다.",
  },
  {
    key: "compare_window_minutes",
    inputId: "compareWindowMinutes",
    label: "비교 구간",
    section: "signal",
    type: "minutes",
    shortHelp: "급등 여부를 판단할 시간 범위입니다.",
    detailHelp: "1분은 민감하고, 5분은 더 완만하게 봅니다. 장중 기본은 3분 기준이 잘 맞습니다.",
  },
  {
    key: "rvol_threshold",
    inputId: "rvolThreshold",
    label: "RVOL 기준",
    section: "signal",
    type: "number2",
    shortHelp: "최근 거래량이 평소 대비 얼마나 늘었는지 보는 기준입니다.",
    detailHelp: "값이 높을수록 평소보다 거래가 강하게 붙은 종목만 남습니다.",
  },
  {
    key: "turnover_ratio_threshold",
    inputId: "turnoverRatioThreshold",
    label: "turnover_ratio 기준",
    section: "signal",
    type: "ratioPct",
    shortHelp: "시가총액 대비 자금 유입 비율을 보는 기준입니다.",
    detailHelp: "종목 크기 차이를 보정하는 데 도움이 되며, 절대 거래대금보다 상대 기준을 앞세웁니다.",
  },
  {
    key: "min_signal_score",
    inputId: "minSignalScore",
    label: "최소 신호점수",
    section: "signal",
    type: "score",
    shortHelp: "여러 조건을 합친 종합 점수의 컷라인입니다.",
    detailHelp: "값이 높을수록 더 엄격한 신호만 남고, 낮출수록 관찰 범위가 넓어집니다.",
  },
  {
    key: "confirmed_breakout_sensitivity",
    inputId: "confirmedBreakoutSensitivity",
    label: "돌파 확인 민감도",
    section: "signal",
    type: "number2",
    shortHelp: "초기 후보가 실제 돌파형 매수 신호로 올라올 때의 엄격함입니다.",
    detailHelp: "값이 높을수록 더 강하게 확인된 돌파만 남기고, 낮추면 더 빠른 확인 신호를 허용합니다.",
  },
  {
    key: "confirmed_momentum_sensitivity",
    inputId: "confirmedMomentumSensitivity",
    label: "모멘텀 확인 민감도",
    section: "signal",
    type: "number2",
    shortHelp: "상승 흐름이 이어지는 종목을 실제 신호로 올릴 때의 엄격함입니다.",
    detailHelp: "장중 이후에는 조금 높여 추격 신호를 줄이고, 장초반에는 기본값으로 두는 편이 자연스럽습니다.",
  },
  {
    key: "take_profit_pct",
    inputId: "takeProfitPct",
    label: "익절 비율",
    section: "signal",
    type: "pct1",
    shortHelp: "수익이 일정 수준에 도달했을 때 익절 매도 신호를 줄지 보는 기준입니다.",
    detailHelp: "자동 주문이 아니라 매도 신호 판단 기준이며, 수익 보호 관점에서 참고합니다.",
  },
  {
    key: "stop_loss_pct",
    inputId: "stopLossPct",
    label: "손절 비율",
    section: "signal",
    type: "pct1",
    shortHelp: "손실이 커졌을 때 손실 관리 매도 신호를 줄지 보는 기준입니다.",
    detailHelp: "자동 주문이 아니라 손실 관리 신호 기준입니다.",
  },
  {
    key: "trailing_stop_pct",
    inputId: "trailingStopPct",
    label: "추적손절 비율",
    section: "signal",
    type: "pct1",
    shortHelp: "상승 후 되밀림이 커졌을 때 수익 보호 신호를 줄지 판단하는 기준입니다.",
    detailHelp: "고점 대비 밀림이 커질 때 추적손절 매도 신호를 줄지 판단하는 값입니다.",
  },
  {
    key: "auto_preset_enabled",
    inputId: "autoPresetEnabled",
    label: "자동 추천",
    section: "signal",
    type: "bool",
    shortHelp: "시간대에 따라 preset을 자동으로 고르는 기능입니다.",
    detailHelp: "장초반·장중·후반에 맞는 추천 기준을 자동 적용합니다.",
  },
  {
    key: "min_trade_value_eok",
    inputId: "minTradeValueEok",
    label: "최소 거래대금 안전 하한",
    section: "advanced",
    type: "eok",
    shortHelp: "유동성이 너무 약한 종목만 걸러내는 보조 기준입니다.",
    detailHelp: "주 판단 기준은 RVOL, 최근 상승률, turnover_ratio이고, 이 값은 안전 하한으로만 참고합니다.",
  },
  {
    key: "sector_strength_bonus_enabled",
    inputId: "sectorStrengthBonusEnabled",
    label: "섹터 강도 가점",
    section: "advanced",
    type: "bool",
    shortHelp: "강한 섹터 흐름이 붙은 종목에 약간의 가점을 주는 기능입니다.",
    detailHelp: "주도 섹터가 붙은 종목을 조금 더 우선해 보려는 보조 옵션입니다.",
  },
  {
    key: "adaptive_tuning_enabled",
    inputId: "adaptiveTuningEnabled",
    label: "성과 기반 보정",
    section: "advanced",
    type: "bool",
    shortHelp: "최근 성과를 보고 기준을 조금 보정하는 기능입니다.",
    detailHelp: "표본이 충분할 때만 약하게 반영하며, 설명 가능한 rule-based 보정만 사용합니다.",
  },
  {
    key: "candidate_quality_threshold",
    inputId: "candidateQualityThreshold",
    label: "후보 품질 기준점",
    section: "advanced",
    type: "score",
    shortHelp: "초기 포착 후보를 한 번 더 걸러 주는 품질 기준입니다.",
    detailHelp: "RVOL, 최근 상승률, turnover, 섹터 동조, 과열 리스크를 함께 반영한 점수입니다. 높이면 false positive 후보를 줄이는 데 도움이 됩니다.",
  },
  {
    key: "focused_promotion_threshold",
    inputId: "focusedPromotionThreshold",
    label: "집중 감시 승격 기준",
    section: "advanced",
    type: "score",
    shortHelp: "후보가 websocket 집중 감시 대상으로 올라가기 위한 최종 기준입니다.",
    detailHelp: "탐지 점수만이 아니라 후보 품질과 과열 리스크를 함께 반영한 우선순위 기준입니다.",
  },
  {
    key: "candidate_expiry_minutes",
    inputId: "candidateExpiryMinutes",
    label: "후보 유지 시간",
    section: "advanced",
    type: "minutes",
    shortHelp: "후속 흐름이 없을 때 후보를 유지할 대략적인 시간입니다.",
    detailHelp: "값을 짧게 두면 더 빠르게 후보를 정리하고, 길게 두면 한 번 더 후속 흐름을 기다립니다.",
  },
  {
    key: "overextension_penalty_strength",
    inputId: "overextensionPenaltyStrength",
    label: "과열 추격 감점 강도",
    section: "advanced",
    type: "number2",
    shortHelp: "이미 늦은 추격 구간을 얼마나 강하게 감점할지 정합니다.",
    detailHelp: "장 후반 급등이나 고가 바로 아래 급한 추격 후보를 줄이고 싶을 때 조금 높이는 편이 좋습니다.",
  },
  {
    key: "tail_risk_penalty_strength",
    inputId: "tailRiskPenaltyStrength",
    label: "꼬리 리스크 감점 강도",
    section: "advanced",
    type: "number2",
    shortHelp: "윗꼬리와 되밀림 위험을 품질 점수에 얼마나 반영할지 정합니다.",
    detailHelp: "값이 높을수록 장중 꼬리가 긴 후보를 더 보수적으로 해석합니다.",
  },
  {
    key: "recent_failure_penalty_strength",
    inputId: "recentFailurePenaltyStrength",
    label: "최근 실패 이력 감점",
    section: "advanced",
    type: "number2",
    shortHelp: "같은 종목이 최근 후속 흐름 없이 꺾였던 이력을 얼마나 감점할지 정합니다.",
    detailHelp: "반복해서 false positive가 나오는 종목을 조금 더 뒤로 보내고 싶을 때 유용합니다.",
  },
];

const state = {
  config: {
    ...DEFAULT_CONFIG,
    ...(window.DASHBOARD_CONFIG || {}),
    tables: {
      ...DEFAULT_CONFIG.tables,
      ...((window.DASHBOARD_CONFIG || {}).tables || {}),
    },
  },
  client: null,
  status: null,
  buySignals: [],
  sellSignals: [],
  overviewRows: [],
  earlyDetectionRows: [],
  focusedRows: [],
  historyRows: [],
  settingsRow: null,
  presetRows: [],
  diagnosticsRows: [],
  validationRows: [],
  sessionEventRows: [],
  sessionReport: null,
  detailIndex: new Map(),
  refreshTimers: new Map(),
  setupNotes: new Set(),
  saveState: { type: "hidden", text: "" },
  settingsFetchState: { status: "idle", note: "", bootstrapDefaultUsed: false },
  historySort: "latest",
  historyStatusFilter: "ALL",
  historySignalFilter: "ALL",
  historyPresetFilter: "ALL",
  historyDateFilter: "ALL",
  historySectorFilter: "ALL",
  historySymbolQuery: "",
  activeTab: "signals",
};

const el = {
  marketStatusLabel: document.getElementById("marketStatusLabel"),
  sourceModeLabel: document.getElementById("sourceModeLabel"),
  activePresetLabel: document.getElementById("activePresetLabel"),
  settingsAppliedLabel: document.getElementById("settingsAppliedLabel"),
  heartbeatLabel: document.getElementById("heartbeatLabel"),
  lastSignalLabel: document.getElementById("lastSignalLabel"),
  statusChips: document.getElementById("statusChips"),
  mobileStatusFlags: document.getElementById("mobileStatusFlags"),
  statusNotice: document.getElementById("statusNotice"),
  statusDetailGrid: document.getElementById("statusDetailGrid"),
  setupNote: document.getElementById("setupNote"),
  operationsGrid: document.getElementById("operationsGrid"),
  runtimeNotes: document.getElementById("runtimeNotes"),
  diagnosticList: document.getElementById("diagnosticList"),
  validationList: document.getElementById("validationList"),
  settingsButton: document.getElementById("settingsButton"),
  historyButton: document.getElementById("historyButton"),
  settingsPanel: document.getElementById("settingsPanel"),
  settingsSummary: document.getElementById("settingsSummary"),
  settingsFlash: document.getElementById("settingsFlash"),
  settingsMeta: document.getElementById("settingsMeta"),
  settingsHelpList: document.getElementById("settingsHelpList"),
  settingsCompareIntro: document.getElementById("settingsCompareIntro"),
  settingsCompareBody: document.getElementById("settingsCompareBody"),
  autoPresetEnabled: document.getElementById("autoPresetEnabled"),
  sectorStrengthBonusEnabled: document.getElementById("sectorStrengthBonusEnabled"),
  adaptiveTuningEnabled: document.getElementById("adaptiveTuningEnabled"),
  broadScanWindowMinutes: document.getElementById("broadScanWindowMinutes"),
  candidateThreshold: document.getElementById("candidateThreshold"),
  earlySurgeThreshold: document.getElementById("earlySurgeThreshold"),
  earlyRvolThreshold: document.getElementById("earlyRvolThreshold"),
  earlyTurnoverThreshold: document.getElementById("earlyTurnoverThreshold"),
  sectorLeaderSensitivity: document.getElementById("sectorLeaderSensitivity"),
  surgePctThreshold: document.getElementById("surgePctThreshold"),
  compareWindowMinutes: document.getElementById("compareWindowMinutes"),
  minTradeValueEok: document.getElementById("minTradeValueEok"),
  candidateQualityThreshold: document.getElementById("candidateQualityThreshold"),
  focusedPromotionThreshold: document.getElementById("focusedPromotionThreshold"),
  candidateExpiryMinutes: document.getElementById("candidateExpiryMinutes"),
  overextensionPenaltyStrength: document.getElementById("overextensionPenaltyStrength"),
  tailRiskPenaltyStrength: document.getElementById("tailRiskPenaltyStrength"),
  recentFailurePenaltyStrength: document.getElementById("recentFailurePenaltyStrength"),
  minSignalScore: document.getElementById("minSignalScore"),
  confirmedBreakoutSensitivity: document.getElementById("confirmedBreakoutSensitivity"),
  confirmedMomentumSensitivity: document.getElementById("confirmedMomentumSensitivity"),
  trailingStopPct: document.getElementById("trailingStopPct"),
  takeProfitPct: document.getElementById("takeProfitPct"),
  stopLossPct: document.getElementById("stopLossPct"),
  rvolThreshold: document.getElementById("rvolThreshold"),
  turnoverRatioThreshold: document.getElementById("turnoverRatioThreshold"),
  selectedPresetName: document.getElementById("selectedPresetName"),
  saveSettingsButton: document.getElementById("saveSettingsButton"),
  enableAutoButton: document.getElementById("enableAutoButton"),
  presetRow: document.getElementById("presetRow"),
  buySignalCount: document.getElementById("buySignalCount"),
  sellSignalCount: document.getElementById("sellSignalCount"),
  buySignalList: document.getElementById("buySignalList"),
  sellSignalList: document.getElementById("sellSignalList"),
  mobileStatusSummary: document.getElementById("mobileStatusSummary"),
  mobileEarlySummaryChips: document.getElementById("mobileEarlySummaryChips"),
  mobileEarlyDetectionList: document.getElementById("mobileEarlyDetectionList"),
  mobileStatusDetailGrid: document.getElementById("mobileStatusDetailGrid"),
  mobileStatusDetailBadge: document.getElementById("mobileStatusDetailBadge"),
  mobileOperationsGrid: document.getElementById("mobileOperationsGrid"),
  mobileRuntimeNotes: document.getElementById("mobileRuntimeNotes"),
  mobileDiagnosticList: document.getElementById("mobileDiagnosticList"),
  mobileValidationList: document.getElementById("mobileValidationList"),
  overviewBoard: document.getElementById("overviewBoard"),
  earlySummaryCards: document.getElementById("earlySummaryCards"),
  focusedSummaryChips: document.getElementById("focusedSummaryChips"),
  earlyDetectionList: document.getElementById("earlyDetectionList"),
  focusedWatchList: document.getElementById("focusedWatchList"),
  historySummaryCards: document.getElementById("historySummaryCards"),
  historySummaryChips: document.getElementById("historySummaryChips"),
  historyAdaptiveChips: document.getElementById("historyAdaptiveChips"),
  historyReviewCards: document.getElementById("historyReviewCards"),
  historyRegimeCards: document.getElementById("historyRegimeCards"),
  historyRegimeReasons: document.getElementById("historyRegimeReasons"),
  historySimilarRegimes: document.getElementById("historySimilarRegimes"),
  historyRecommendationConfidence: document.getElementById("historyRecommendationConfidence"),
  historyRollingReview: document.getElementById("historyRollingReview"),
  historyExperimentCards: document.getElementById("historyExperimentCards"),
  historyExperimentList: document.getElementById("historyExperimentList"),
  historyPresetPerformance: document.getElementById("historyPresetPerformance"),
  historyPresetStructure: document.getElementById("historyPresetStructure"),
  historyPresetStability: document.getElementById("historyPresetStability"),
  historyOptimizationWarnings: document.getElementById("historyOptimizationWarnings"),
  historyPatternCards: document.getElementById("historyPatternCards"),
  historyRegimeStability: document.getElementById("historyRegimeStability"),
  historyRecommendationList: document.getElementById("historyRecommendationList"),
  historySignalValidation: document.getElementById("historySignalValidation"),
  historyQualityCards: document.getElementById("historyQualityCards"),
  historyTimelineList: document.getElementById("historyTimelineList"),
  historySort: document.getElementById("historySort"),
  historyStatusFilter: document.getElementById("historyStatusFilter"),
  historySignalFilter: document.getElementById("historySignalFilter"),
  historyPresetFilter: document.getElementById("historyPresetFilter"),
  historyDateFilter: document.getElementById("historyDateFilter"),
  historySectorFilter: document.getElementById("historySectorFilter"),
  historySymbolQuery: document.getElementById("historySymbolQuery"),
  historyTableBody: document.getElementById("historyTableBody"),
  detailModal: document.getElementById("detailModal"),
  detailTitle: document.getElementById("detailTitle"),
  detailSummary: document.getElementById("detailSummary"),
  detailGrid: document.getElementById("detailGrid"),
  detailThresholds: document.getElementById("detailThresholds"),
  detailReasons: document.getElementById("detailReasons"),
  tabButtons: Array.from(document.querySelectorAll("[data-tab-button]")),
  tabPanels: Array.from(document.querySelectorAll("[data-tab-panel]")),
};

const tableName = (key) => state.config.tables[key];

const numberOrZero = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const isTruthy = (value) => {
  if (typeof value === "boolean") return value;
  return ["true", "1", "yes", "y", "on"].includes(String(value || "").trim().toLowerCase());
};

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  }[char]));

const parseMaybeJson = (value, fallback) => {
  if (value == null) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const safeArray = (value) => (Array.isArray(value) ? value : []);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const normalizedNowIso = () => new Date().toISOString();

const noteOnce = (message) => {
  if (!message || state.setupNotes.has(message)) return;
  state.setupNotes.add(message);
  el.setupNote.textContent = Array.from(state.setupNotes).join(" ");
};

const formatPrice = (value) => `${numberOrZero(value).toLocaleString("ko-KR")}원`;
const formatPct = (value, digits = 2) => `${numberOrZero(value).toFixed(digits)}%`;
const formatEok = (value) => `${numberOrZero(value).toFixed(1)}억`;
const formatRatioPct = (value) => `${(numberOrZero(value) * 100).toFixed(3)}%`;
const signedTone = (value) => (numberOrZero(value) > 0 ? "positive" : numberOrZero(value) < 0 ? "negative" : "neutral");
const signedClassName = (value, subtle = false) => {
  const tone = signedTone(value);
  return `signed-value ${tone}${subtle ? " subtle" : ""}`;
};
const signedText = (value, text, subtle = false) => `<span class="${signedClassName(value, subtle)}">${escapeHtml(text)}</span>`;
const signedPctText = (value, digits = 2, subtle = false) => signedText(value, formatPct(value, digits), subtle);
const signedRatioPctText = (value, subtle = false) => signedText(value, formatRatioPct(value), subtle);
const signedPriceText = (price, directionValue = 0, subtle = true) => signedText(directionValue, formatPrice(price), subtle);
const signedNumberText = (value, digits = 1, suffix = "", subtle = false) =>
  signedText(value, `${numberOrZero(value).toFixed(digits)}${suffix}`, subtle);
const htmlValue = (markup) => ({ __html: String(markup || "") });

function formatHolding(seconds) {
  const total = Math.max(0, Math.round(numberOrZero(seconds)));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  if (minutes > 0) return `${minutes}분 ${secs}초`;
  return `${secs}초`;
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function secondsSince(value) {
  if (!value) return 0;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 0;
  return Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
}

const approxEqual = (left, right, digits = 6) =>
  Math.abs(numberOrZero(left) - numberOrZero(right)) <= Math.pow(10, -digits);

const fallbackPreset = () =>
  BUILT_IN_PRESETS.find((item) => item.preset_name === "intraday_base") || BUILT_IN_PRESETS[0];

const presetByName = (name) =>
  state.presetRows.find((row) => row.preset_name === name)
  || BUILT_IN_PRESETS.find((row) => row.preset_name === name)
  || null;

const isTestPreset = (name) => String(name || "").trim() === "test_relaxed_capture";

function changedSourceLabel(value) {
  const key = String(value || "").trim();
  if (key === "public-ui") return "공개 페이지";
  if (key === "auto-preset") return "자동 추천";
  if (key === "runner-default") return "러너 기본값";
  if (key === "ui-bootstrap-default") return "최초 기본값";
  if (key === "manual") return "수동 조정";
  return key || "확인 중";
}

const fieldByKey = (key) => SETTINGS_FIELDS.find((field) => field.key === key);

function formatThresholdValue(key, value) {
  if (["compare_window_minutes", "broad_scan_window_minutes"].includes(key)) {
    return `${Math.round(numberOrZero(value))}분`;
  }
  if (key === "min_trade_value_eok") return formatEok(value);
  if ([
    "surge_pct_threshold",
    "early_surge_threshold",
    "trailing_stop_pct",
    "take_profit_pct",
    "stop_loss_pct",
  ].includes(key)) {
    return formatPct(value, 1);
  }
  if (["min_signal_score", "candidate_threshold", "candidate_quality_threshold", "focused_promotion_threshold"].includes(key)) {
    return `${numberOrZero(value).toFixed(0)}점`;
  }
  if ([
    "rvol_threshold",
    "early_rvol_threshold",
    "sector_leader_sensitivity",
    "confirmed_breakout_sensitivity",
    "confirmed_momentum_sensitivity",
    "overextension_penalty_strength",
    "tail_risk_penalty_strength",
    "recent_failure_penalty_strength",
  ].includes(key)) return numberOrZero(value).toFixed(2);
  if (key === "candidate_expiry_minutes") return `${Math.round(numberOrZero(value))}분`;
  if (["turnover_ratio_threshold", "early_turnover_threshold"].includes(key)) return formatRatioPct(value);
  if (["auto_preset_enabled", "sector_strength_bonus_enabled", "adaptive_tuning_enabled"].includes(key)) {
    return isTruthy(value) ? "사용" : "해제";
  }
  if (typeof value === "number" && Number.isFinite(value)) return numberOrZero(value).toFixed(2);
  return String(value ?? "-");
}

function sectionLabel(section) {
  if (section === "scan") return "스캔 설정";
  if (section === "signal") return "실시간 신호";
  return "고급 설정";
}

function defaultSettingsRow() {
  const preset = fallbackPreset();
  return {
    settings_key: state.config.appStatusKey,
    selected_preset_name: preset.preset_name,
    selected_preset_label: preset.label,
    active_preset_name: preset.preset_name,
    active_preset_label: preset.label,
    active_preset_reason: preset.reason,
    auto_preset_enabled: false,
    broad_scan_window_minutes: preset.broad_scan_window_minutes,
    candidate_threshold: preset.candidate_threshold,
    early_surge_threshold: preset.early_surge_threshold,
    early_rvol_threshold: preset.early_rvol_threshold,
    early_turnover_threshold: preset.early_turnover_threshold,
    sector_leader_sensitivity: preset.sector_leader_sensitivity,
    candidate_quality_threshold: preset.candidate_quality_threshold,
    focused_promotion_threshold: preset.focused_promotion_threshold,
    candidate_expiry_minutes: preset.candidate_expiry_minutes,
    overextension_penalty_strength: preset.overextension_penalty_strength,
    tail_risk_penalty_strength: preset.tail_risk_penalty_strength,
    recent_failure_penalty_strength: preset.recent_failure_penalty_strength,
    surge_pct_threshold: preset.surge_pct_threshold,
    compare_window_minutes: preset.compare_window_minutes,
    min_trade_value_eok: preset.min_trade_value_eok,
    min_signal_score: preset.min_signal_score,
    confirmed_breakout_sensitivity: preset.confirmed_breakout_sensitivity,
    confirmed_momentum_sensitivity: preset.confirmed_momentum_sensitivity,
    trailing_stop_pct: preset.trailing_stop_pct,
    take_profit_pct: preset.take_profit_pct,
    stop_loss_pct: preset.stop_loss_pct,
    rvol_threshold: preset.rvol_threshold,
    turnover_ratio_threshold: preset.turnover_ratio_threshold,
    sector_strength_bonus_enabled: true,
    adaptive_tuning_enabled: true,
    changed_source: "ui-bootstrap-default",
    change_reason: "initial-default-only",
    source_mode: "manual",
    note: "최초 부트스트랩에서만 쓰는 기본값입니다. 실제 저장값을 읽으면 그 상태를 유지합니다.",
    updated_at: normalizedNowIso(),
  };
}

function normalizeSettingsRow(row) {
  const merged = { ...defaultSettingsRow(), ...(row || {}) };
  return {
    ...merged,
    auto_preset_enabled: isTruthy(merged.auto_preset_enabled),
    sector_strength_bonus_enabled: isTruthy(merged.sector_strength_bonus_enabled),
    adaptive_tuning_enabled: isTruthy(merged.adaptive_tuning_enabled),
    broad_scan_window_minutes: Math.max(1, Math.round(numberOrZero(merged.broad_scan_window_minutes || 1))),
    candidate_threshold: numberOrZero(merged.candidate_threshold),
    early_surge_threshold: numberOrZero(merged.early_surge_threshold),
    early_rvol_threshold: numberOrZero(merged.early_rvol_threshold),
    early_turnover_threshold: numberOrZero(merged.early_turnover_threshold),
    sector_leader_sensitivity: numberOrZero(merged.sector_leader_sensitivity),
    candidate_quality_threshold: numberOrZero(merged.candidate_quality_threshold),
    focused_promotion_threshold: numberOrZero(merged.focused_promotion_threshold),
    candidate_expiry_minutes: Math.max(1, Math.round(numberOrZero(merged.candidate_expiry_minutes || 1))),
    overextension_penalty_strength: numberOrZero(merged.overextension_penalty_strength),
    tail_risk_penalty_strength: numberOrZero(merged.tail_risk_penalty_strength),
    recent_failure_penalty_strength: numberOrZero(merged.recent_failure_penalty_strength),
    surge_pct_threshold: numberOrZero(merged.surge_pct_threshold),
    compare_window_minutes: Math.max(1, Math.round(numberOrZero(merged.compare_window_minutes || 1))),
    min_trade_value_eok: numberOrZero(merged.min_trade_value_eok),
    min_signal_score: numberOrZero(merged.min_signal_score),
    confirmed_breakout_sensitivity: numberOrZero(merged.confirmed_breakout_sensitivity),
    confirmed_momentum_sensitivity: numberOrZero(merged.confirmed_momentum_sensitivity),
    trailing_stop_pct: numberOrZero(merged.trailing_stop_pct),
    take_profit_pct: numberOrZero(merged.take_profit_pct),
    stop_loss_pct: numberOrZero(merged.stop_loss_pct),
    rvol_threshold: numberOrZero(merged.rvol_threshold),
    turnover_ratio_threshold: numberOrZero(merged.turnover_ratio_threshold),
  };
}

function settingsSnapshotFromRow(row) {
  const normalized = normalizeSettingsRow(row);
  return {
    broad_scan_window_minutes: normalized.broad_scan_window_minutes,
    candidate_threshold: normalized.candidate_threshold,
    early_surge_threshold: normalized.early_surge_threshold,
    early_rvol_threshold: normalized.early_rvol_threshold,
    early_turnover_threshold: normalized.early_turnover_threshold,
    sector_leader_sensitivity: normalized.sector_leader_sensitivity,
    candidate_quality_threshold: normalized.candidate_quality_threshold,
    focused_promotion_threshold: normalized.focused_promotion_threshold,
    candidate_expiry_minutes: normalized.candidate_expiry_minutes,
    overextension_penalty_strength: normalized.overextension_penalty_strength,
    tail_risk_penalty_strength: normalized.tail_risk_penalty_strength,
    recent_failure_penalty_strength: normalized.recent_failure_penalty_strength,
    surge_pct_threshold: normalized.surge_pct_threshold,
    compare_window_minutes: normalized.compare_window_minutes,
    min_trade_value_eok: normalized.min_trade_value_eok,
    min_signal_score: normalized.min_signal_score,
    confirmed_breakout_sensitivity: normalized.confirmed_breakout_sensitivity,
    confirmed_momentum_sensitivity: normalized.confirmed_momentum_sensitivity,
    trailing_stop_pct: normalized.trailing_stop_pct,
    take_profit_pct: normalized.take_profit_pct,
    stop_loss_pct: normalized.stop_loss_pct,
    rvol_threshold: normalized.rvol_threshold,
    turnover_ratio_threshold: normalized.turnover_ratio_threshold,
    auto_preset_enabled: normalized.auto_preset_enabled,
    sector_strength_bonus_enabled: normalized.sector_strength_bonus_enabled,
    adaptive_tuning_enabled: normalized.adaptive_tuning_enabled,
  };
}

function normalizeRow(row) {
  const thresholdSnapshot = parseMaybeJson(row.threshold_snapshot, {});
  const thresholdsSnapshot = parseMaybeJson(row.thresholds_snapshot, {});
  return {
    ...row,
    detail: parseMaybeJson(row.detail, {}),
    payload: parseMaybeJson(row.payload, {}),
    settings_snapshot: parseMaybeJson(row.settings_snapshot, {}),
    threshold_snapshot: thresholdSnapshot,
    thresholds_snapshot: Object.keys(thresholdsSnapshot).length ? thresholdsSnapshot : thresholdSnapshot,
    reason_lines: safeArray(parseMaybeJson(row.reason_lines, [])),
    reason_tags: safeArray(parseMaybeJson(row.reason_tags, [])),
    quality_good_reasons: safeArray(parseMaybeJson(row.quality_good_reasons, [])),
    quality_caution_reasons: safeArray(parseMaybeJson(row.quality_caution_reasons, [])),
  };
}

function normalizePresetRows(rows) {
  const sourceRows = (rows || []).length ? rows : BUILT_IN_PRESETS.map((row, index) => ({ ...row, sort_order: index + 1 }));
  return sourceRows.map((row, index) => ({
    ...row,
    sort_order: numberOrZero(row.sort_order || index + 1),
    regime_tags: safeArray(parseMaybeJson(row.regime_tags, row.regime_tags || [])),
    regime_note: String(row.regime_note || ""),
  }));
}

function normalizeHistoryRows(rows) {
  return (rows || []).map(normalizeRow);
}

async function fetchStatus() {
  const { data, error } = await state.client
    .from(tableName("appStatus"))
    .select("*")
    .eq("status_key", state.config.appStatusKey)
    .maybeSingle();
  if (error) {
    if (error.code === "PGRST205") {
      state.status = null;
      noteOnce("app_status 테이블이 아직 준비되지 않았습니다. Supabase SQL을 먼저 적용해 주세요.");
      return;
    }
    throw error;
  }
  state.status = data || null;
}

async function fetchBuySignals() {
  const { data, error } = await state.client
    .from(tableName("buySignals"))
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(40);
  if (error) throw error;
  state.buySignals = (data || []).map(normalizeRow);
}

async function fetchSellSignals() {
  const { data, error } = await state.client
    .from(tableName("sellSignals"))
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(40);
  if (error) throw error;
  state.sellSignals = (data || []).map(normalizeRow);
}

async function fetchOverviewRows() {
  const activeTable = state.status?.market_open
    ? tableName("risingSectorRows")
    : tableName("lastMarket");
  let query = state.client
    .from(activeTable)
    .select("*")
    .order("change_rate", { ascending: false })
    .order("trade_value_eok", { ascending: false })
    .limit(120);
  const { data, error } = await query;
  if (error) {
    if (error.code === "PGRST205" && activeTable === tableName("lastMarket")) {
      state.overviewRows = [];
      noteOnce("last_market 데이터가 아직 없어 보드가 비어 있을 수 있습니다.");
      return;
    }
    throw error;
  }
  state.overviewRows = (data || []).map(normalizeRow);
}

async function fetchEarlyDetectionRows() {
  const { data, error } = await state.client
    .from(tableName("earlyDetectionRows"))
    .select("*")
    .order("candidate_score", { ascending: false })
    .limit(120);
  if (error) {
    if (error.code === "PGRST205") {
      state.earlyDetectionRows = [];
      noteOnce("early_detection_rows 테이블이 아직 없어 초기 포착 탭은 비어 있을 수 있습니다.");
      return;
    }
    throw error;
  }
  state.earlyDetectionRows = (data || []).map(normalizeRow);
}

async function fetchFocusedRows() {
  const { data, error } = await state.client
    .from(tableName("focusedWatchlistState"))
    .select("*")
    .order("focus_rank", { ascending: true })
    .limit(120);
  if (error) {
    if (error.code === "PGRST205") {
      state.focusedRows = [];
      noteOnce("focused_watchlist_state 테이블이 아직 없어 집중 감시 종목 목록은 비어 있을 수 있습니다.");
      return;
    }
    throw error;
  }
  state.focusedRows = (data || []).map(normalizeRow);
}

async function fetchHistoryRows() {
  const { data, error } = await state.client
    .from(tableName("tradeHistory"))
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(state.config.historyLimit || 120);
  if (error) throw error;
  state.historyRows = normalizeHistoryRows(data || []);
}

async function fetchSettings() {
  const { data, error } = await state.client
    .from(tableName("signalSettings"))
    .select("*")
    .eq("settings_key", state.config.appStatusKey)
    .maybeSingle();
  if (error) {
    if (error.code === "PGRST205") {
      if (!state.settingsRow) {
        state.settingsRow = defaultSettingsRow();
        state.settingsFetchState = {
          status: "bootstrap-default",
          note: "signal_settings 테이블이 아직 없어 최초 기본값으로만 시작했습니다.",
          bootstrapDefaultUsed: true,
        };
      } else {
        state.settingsFetchState = {
          status: "stale-keep",
          note: "signal_settings 테이블을 읽지 못해 마지막 성공 상태를 유지합니다.",
          bootstrapDefaultUsed: false,
        };
      }
      noteOnce("signal_settings를 읽지 못해 마지막 성공 상태를 유지합니다.");
      return;
    }
    state.settingsFetchState = {
      status: "stale-keep",
      note: "설정 읽기 실패로 마지막 성공 상태를 유지합니다.",
      bootstrapDefaultUsed: false,
    };
    noteOnce("설정 읽기 실패로 마지막 성공 상태를 유지합니다.");
    if (!state.settingsRow) {
      state.settingsRow = defaultSettingsRow();
      state.settingsFetchState.bootstrapDefaultUsed = true;
      state.settingsFetchState.status = "bootstrap-default";
      state.settingsFetchState.note = "최초 설정 로드에 실패해 임시 기본값으로 시작했습니다.";
    }
    return;
  }
  state.settingsRow = normalizeSettingsRow(data || state.settingsRow || defaultSettingsRow());
  state.settingsFetchState = {
    status: "ok",
    note: "",
    bootstrapDefaultUsed: false,
  };
}

async function fetchPresets() {
  const { data, error } = await state.client
    .from(tableName("signalPresets"))
    .select("*")
    .order("sort_order", { ascending: true })
    .limit(50);
  if (error) {
    if (error.code === "PGRST205") {
      state.presetRows = normalizePresetRows([]);
      noteOnce("signal_presets가 없어 기본 추천값을 사용 중입니다.");
      return;
    }
    throw error;
  }
  state.presetRows = normalizePresetRows(data || []);
}

async function fetchDiagnostics() {
  const { data, error } = await state.client
    .from(tableName("runtimeDiagnostics"))
    .select("*")
    .order("created_at", { ascending: false })
    .limit(state.config.diagnosticsLimit || 12);
  if (error) {
    if (error.code === "PGRST205") {
      state.diagnosticsRows = [];
      noteOnce("runtime_diagnostics 테이블이 아직 없어 최근 진단 목록은 비어 있을 수 있습니다.");
      return;
    }
    throw error;
  }
  state.diagnosticsRows = (data || []).map((row) => ({
    ...row,
    details: parseMaybeJson(row.details, parseMaybeJson(row.details_json, {})),
  }));
}

async function fetchValidationEvents() {
  const { data, error } = await state.client
    .from(tableName("validationEvents"))
    .select("*")
    .order("created_at", { ascending: false })
    .limit(state.config.validationLimit || 12);
  if (error) {
    if (error.code === "PGRST205") {
      state.validationRows = [];
      noteOnce("validation_events 테이블이 아직 없어 운영 검증 기록은 비어 있을 수 있습니다.");
      return;
    }
    throw error;
  }
  state.validationRows = (data || []).map((row) => ({
    ...row,
    detail_snapshot: parseMaybeJson(row.detail_snapshot, parseMaybeJson(row.payload_json, {})),
  }));
}

async function fetchSessionReport() {
  const { data, error } = await state.client
    .from(tableName("sessionReports"))
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) {
    if (error.code === "PGRST205") {
      state.sessionReport = null;
      noteOnce("session_reports 테이블이 아직 없어 세션 요약은 거래 이력 기준으로 계산합니다.");
      return;
    }
    throw error;
  }
  const row = (data || [])[0] || null;
  state.sessionReport = row ? { ...row, summary: parseMaybeJson(row.summary, {}) } : null;
}

function upsertDetailIndex(rows) {
  rows.forEach((row) => {
    const key = row.signal_id || row.position_id || row.candidate_id || row.event_id || row.code;
    if (key) state.detailIndex.set(key, row);
  });
}

function scheduleRefresh(key, fn, renderFn) {
  if (state.refreshTimers.has(key)) clearTimeout(state.refreshTimers.get(key));
  const timer = setTimeout(async () => {
    try {
      await fn();
      renderFn();
    } catch (error) {
      console.error(error);
    }
  }, 180);
  state.refreshTimers.set(key, timer);
}

function detailFromRow(row) {
  const normalized = normalizeRow(row || {});
  const payload = normalized.payload || {};
  const entry = parseMaybeJson(payload.entry_detail, {});
  const current = parseMaybeJson(payload.current_detail, {});
  const exit = parseMaybeJson(payload.exit_detail, {});
  const chosen = normalized.detail && Object.keys(normalized.detail).length
    ? normalized.detail
    : normalized.status === "CLOSED"
      ? exit
      : current || entry || exit;

  return {
    code: chosen.code || normalized.code || "",
    name: chosen.name || normalized.name || "",
    market: chosen.market || normalized.market || "",
    sector: chosen.sector || normalized.sector || "섹터 확인 중",
    current_price: chosen.current_price ?? normalized.price ?? normalized.reference_price ?? normalized.current_price ?? 0,
    open_price: chosen.open_price ?? normalized.open_price ?? 0,
    high_price: chosen.high_price ?? normalized.high_price ?? 0,
    low_price: chosen.low_price ?? normalized.low_price ?? 0,
    change_rate: chosen.change_rate ?? normalized.change_rate ?? 0,
    trade_value_eok: chosen.trade_value_eok ?? normalized.trade_value_eok ?? 0,
    signal_type: chosen.signal_type || normalized.signal_type || normalized.buy_signal_type || normalized.sell_signal_type || "",
    signal_score: chosen.signal_score ?? normalized.score ?? normalized.score_at_entry ?? normalized.score_at_exit ?? 0,
    signal_summary: chosen.signal_summary || normalized.summary || normalized.entry_summary || normalized.exit_summary || "",
    reason_lines: safeArray(chosen.reason_lines || normalized.reason_lines),
    rvol: chosen.rvol ?? normalized.rvol ?? 0,
    rvol_acceleration: chosen.rvol_acceleration ?? normalized.rvol_acceleration ?? 0,
    recent_change_pct: chosen.recent_change_pct ?? normalized.recent_change_pct ?? 0,
    recent_change_1m_pct: chosen.recent_change_1m_pct ?? normalized.recent_change_1m_pct ?? 0,
    recent_change_3m_pct: chosen.recent_change_3m_pct ?? normalized.recent_change_3m_pct ?? 0,
    recent_change_5m_pct: chosen.recent_change_5m_pct ?? normalized.recent_change_5m_pct ?? 0,
    compare_window_minutes: chosen.compare_window_minutes ?? normalized.compare_window_minutes ?? 0,
    recent_trade_value_eok: chosen.recent_trade_value_eok ?? normalized.recent_trade_value_eok ?? 0,
    turnover_ratio: chosen.turnover_ratio ?? normalized.turnover_ratio ?? 0,
    recent_turnover_ratio: chosen.recent_turnover_ratio ?? normalized.recent_turnover_ratio ?? 0,
    turnover_acceleration: chosen.turnover_acceleration ?? normalized.turnover_acceleration ?? 0,
    range_position_pct: chosen.range_position_pct ?? (numberOrZero(normalized.range_position) * 100),
    sector_strength: chosen.sector_strength ?? normalized.sector_strength ?? 0,
    tail_risk: chosen.tail_risk ?? normalized.tail_risk ?? 0,
    active_preset_name: chosen.active_preset_name || normalized.preset_name || "",
    active_preset_label: chosen.active_preset_label || normalized.preset_label || "",
    active_preset_reason: chosen.active_preset_reason || "",
    auto_preset_enabled: chosen.auto_preset_enabled ?? normalized.auto_preset_enabled ?? false,
    settings_changed_source: chosen.settings_changed_source || normalized.settings_changed_source || "",
    settings_change_reason: chosen.settings_change_reason || normalized.settings_change_reason || "",
    settings_updated_at: chosen.settings_updated_at || normalized.signal_settings_updated_at || normalized.updated_at || "",
    settings_applied_at: chosen.settings_applied_at || normalized.signal_settings_applied_at || "",
    thresholds_snapshot: chosen.thresholds_snapshot || normalized.thresholds_snapshot || normalized.threshold_snapshot || normalized.settings_snapshot || {},
    threshold_used: chosen.threshold_used ?? normalized.threshold_used ?? 0,
    threshold_adjustment: chosen.threshold_adjustment ?? 0,
    sector_bonus: chosen.sector_bonus ?? 0,
    holding_seconds: chosen.holding_seconds ?? normalized.holding_seconds ?? 0,
    holding_text: chosen.holding_text || normalized.holding_text || formatHolding(normalized.holding_seconds || 0),
    pnl_pct: chosen.pnl_pct ?? normalized.realized_pnl_pct ?? normalized.current_pnl_pct ?? 0,
    result_status: chosen.result_status || normalized.result_status || normalized.status || "",
    trade_time: chosen.trade_time || normalized.trade_time || "",
    received_at: chosen.received_at || normalized.updated_at || "",
    side: chosen.side || normalized.side || "",
    candidate_state: chosen.candidate_state || normalized.candidate_state || "",
    candidate_id: chosen.candidate_id || normalized.candidate_id || "",
    candidate_score: chosen.candidate_score ?? normalized.candidate_score ?? 0,
    candidate_quality_score: chosen.candidate_quality_score ?? normalized.candidate_quality_score ?? 0,
    quality_label: chosen.quality_label || normalized.quality_label || "",
    quality_label_text: chosen.quality_label_text || normalized.quality_label_text || "",
    overextension_risk: chosen.overextension_risk ?? normalized.overextension_risk ?? 0,
    overextension_penalty: chosen.overextension_penalty ?? normalized.overextension_penalty ?? 0,
    tail_risk_penalty: chosen.tail_risk_penalty ?? normalized.tail_risk_penalty ?? 0,
    recent_failure_penalty: chosen.recent_failure_penalty ?? normalized.recent_failure_penalty ?? 0,
    promotion_score: chosen.promotion_score ?? normalized.promotion_score ?? 0,
    quality_good_reasons: safeArray(chosen.quality_good_reasons || normalized.quality_good_reasons),
    quality_caution_reasons: safeArray(chosen.quality_caution_reasons || normalized.quality_caution_reasons),
    outcome_label: chosen.outcome_label || normalized.outcome_label || "",
    focus_score: chosen.focus_score ?? normalized.focus_score ?? 0,
    focus_rank: chosen.focus_rank ?? normalized.focus_rank ?? 0,
    promoted_at: chosen.promoted_at || normalized.promoted_at || "",
    detail: chosen,
  };
}

function buildNarrativeReasonLines(detail, row) {
  const thresholds = detail.thresholds_snapshot || {};
  const lines = [];
  const pushUnique = (text) => {
    if (text && !lines.includes(text)) lines.push(text);
  };

  safeArray(detail.reason_lines).forEach(pushUnique);

  if (String(detail.signal_type || "") === "LAST_MARKET") {
    pushUnique("현재는 휴장 상태라 마지막 시장 기준으로 정리된 데이터를 보여주고 있습니다.");
    return lines;
  }

  if (numberOrZero(detail.compare_window_minutes) > 0) {
    pushUnique(`최근 ${detail.compare_window_minutes}분 상승률이 ${formatPct(detail.recent_change_pct)}입니다.`);
  }
  if (numberOrZero(detail.recent_change_1m_pct) > 0 || numberOrZero(detail.recent_change_3m_pct) > 0 || numberOrZero(detail.recent_change_5m_pct) > 0) {
    pushUnique(`최근 1분 ${formatPct(detail.recent_change_1m_pct)}, 3분 ${formatPct(detail.recent_change_3m_pct)}, 5분 ${formatPct(detail.recent_change_5m_pct)} 흐름을 함께 비교했습니다.`);
  }
  if (numberOrZero(detail.rvol) > 0) {
    pushUnique(`최근 거래량이 평소 대비 ${numberOrZero(detail.rvol).toFixed(2)}배 수준으로 늘었습니다.`);
  }
  if (numberOrZero(detail.rvol_acceleration) > 0) {
    pushUnique(`RVOL 가속도가 ${numberOrZero(detail.rvol_acceleration).toFixed(2)}로 높아지며 거래 강도가 붙고 있습니다.`);
  }
  if (numberOrZero(detail.turnover_ratio) > 0) {
    pushUnique(`시가총액 대비 자금 유입 비율은 ${formatRatioPct(detail.turnover_ratio)}입니다.`);
  }
  if (numberOrZero(detail.recent_turnover_ratio) > 0) {
    pushUnique(`최근 구간 기준 자금 유입 비율은 ${formatRatioPct(detail.recent_turnover_ratio)}로 계산됩니다.`);
  }
  if (numberOrZero(detail.turnover_acceleration) > 0) {
    pushUnique(`turnover 비율이 빨라지며 상대 유동성이 개선되고 있습니다.`);
  }
  if (numberOrZero(detail.range_position_pct) > 0) {
    pushUnique(
      numberOrZero(detail.range_position_pct) >= 85
        ? "현재 가격이 당일 고가 부근에서 유지되고 있습니다."
        : `현재 가격은 당일 범위의 ${numberOrZero(detail.range_position_pct).toFixed(0)}% 위치에 있습니다.`,
    );
  }
  if (numberOrZero(thresholds.min_trade_value_eok) > 0 && numberOrZero(detail.trade_value_eok) > 0) {
    pushUnique(`절대 거래대금은 메인 기준이 아니라 안전 하한으로만 참고하며, 현재 값은 ${formatEok(detail.trade_value_eok)}입니다.`);
  }
  if (detail.active_preset_label) {
    pushUnique(`현재 적용 preset은 ${detail.active_preset_label}입니다.`);
  }
  if (detail.candidate_state === "focused") {
    pushUnique(`전체 탐지층을 통과해 집중 실시간 감시 대상으로 올라온 후보입니다${numberOrZero(detail.focus_rank) > 0 ? ` (${numberOrZero(detail.focus_rank).toFixed(0)}순위)` : ""}.`);
  } else if (detail.candidate_state === "candidate") {
    pushUnique("전체 탐지층에서 먼저 포착된 초기 후보입니다.");
  }
  if (numberOrZero(detail.candidate_quality_score) > 0) {
    pushUnique(`후보 품질 점수는 ${numberOrZero(detail.candidate_quality_score).toFixed(1)}점${detail.quality_label_text ? ` (${detail.quality_label_text})` : ""}입니다.`);
  }
  safeArray(detail.quality_good_reasons).slice(0, 2).forEach(pushUnique);
  safeArray(detail.quality_caution_reasons).slice(0, 2).forEach(pushUnique);
  if (numberOrZero(detail.overextension_risk) > 0) {
    pushUnique(
      numberOrZero(detail.overextension_risk) >= 7
        ? `과열 추격 리스크가 ${numberOrZero(detail.overextension_risk).toFixed(1)}점으로 높아 한 번 더 확인이 필요합니다.`
        : `과열 추격 리스크는 ${numberOrZero(detail.overextension_risk).toFixed(1)}점으로 계산했습니다.`,
    );
  }
  if (numberOrZero(detail.recent_failure_penalty) > 0) {
    pushUnique(`최근 실패 이력이 반영돼 ${numberOrZero(detail.recent_failure_penalty).toFixed(1)}점 보수적으로 계산했습니다.`);
  }
  if (numberOrZero(detail.sector_strength) > 0) {
    pushUnique(`섹터 동조 강도는 ${numberOrZero(detail.sector_strength).toFixed(1)}로 반영했습니다.`);
  }
  if (detail.settings_change_reason) {
    pushUnique(`최근 설정 변경 사유는 "${detail.settings_change_reason}"입니다.`);
  }
  if (detail.threshold_adjustment || detail.sector_bonus) {
    pushUnique(
      `최근 성과 보정은 ${detail.threshold_adjustment >= 0 ? "+" : ""}${numberOrZero(detail.threshold_adjustment).toFixed(1)}, 섹터 가점은 ${detail.sector_bonus >= 0 ? "+" : ""}${numberOrZero(detail.sector_bonus).toFixed(1)}입니다.`,
    );
  }

  const signalType = String(detail.signal_type || "");
  if (signalType === "SELL_TAKE_PROFIT") pushUnique("익절 기준 도달 뒤 되밀림이 커져 매도 신호가 발생했습니다.");
  if (signalType === "SELL_BREAKDOWN") pushUnique("손실 관리 기준 이탈로 매도 신호가 발생했습니다.");
  if (signalType === "SELL_TRAILING_STOP") pushUnique("고점 대비 되밀림이 커져 추적손절 매도 신호가 발생했습니다.");
  if (signalType === "SELL_MOMENTUM_LOSS") pushUnique("상승 탄력이 약해지고 보유 시간이 길어져 매도 신호가 발생했습니다.");

  if (row?.summary) pushUnique(row.summary);
  return lines;
}

function signalSummaryText(row, detail, side) {
  if (row.summary) return row.summary;
  if (detail.signal_summary) return detail.signal_summary;
  return side === "BUY"
    ? "조건을 통과한 실시간 매수 신호입니다."
    : "보유 중인 흐름에서 매도 판단 기준이 발생했습니다.";
}

function tableThresholdSummary(snapshot) {
  const values = parseMaybeJson(snapshot, {});
  const scan = values.broad_scan_window_minutes != null ? `${numberOrZero(values.broad_scan_window_minutes).toFixed(0)}분` : "-";
  const candidate = values.candidate_threshold != null ? `${numberOrZero(values.candidate_threshold).toFixed(0)}점` : "-";
  const quality = values.candidate_quality_threshold != null ? `${numberOrZero(values.candidate_quality_threshold).toFixed(0)}점` : "-";
  const promotion = values.focused_promotion_threshold != null ? `${numberOrZero(values.focused_promotion_threshold).toFixed(0)}점` : "-";
  const compare = values.compare_window_minutes != null ? `${numberOrZero(values.compare_window_minutes).toFixed(0)}분` : "-";
  const score = values.min_signal_score != null ? `${numberOrZero(values.min_signal_score).toFixed(0)}점` : "-";
  const rvol = values.rvol_threshold != null ? numberOrZero(values.rvol_threshold).toFixed(2) : "-";
  const turnover = values.turnover_ratio_threshold != null ? formatRatioPct(values.turnover_ratio_threshold) : "-";
  return `스캔 ${scan} / 후보 ${candidate} / 품질 ${quality} / 승격 ${promotion} / 비교 ${compare} / RVOL ${rvol} / turnover ${turnover} / 신호점수 ${score}`;
}

function currentComparisonState() {
  const inputRow = normalizeSettingsRow(state.settingsRow || defaultSettingsRow());
  const status = state.status || {};
  const selectedPreset = presetByName(status.selected_preset_name || inputRow.selected_preset_name) || fallbackPreset();
  const activePreset = presetByName(status.active_preset_name || inputRow.active_preset_name) || selectedPreset;
  const recommendedPreset = inputRow.auto_preset_enabled ? activePreset : selectedPreset;
  const effective = {
    ...settingsSnapshotFromRow(inputRow),
    ...(status.effective_signal_settings || {}),
  };
  return {
    inputRow,
    selectedPreset,
    activePreset,
    recommendedPreset,
    effective,
    inputSnapshot: status.input_signal_settings || settingsSnapshotFromRow(inputRow),
    selectedPresetSnapshot: status.selected_preset_settings || settingsSnapshotFromRow(recommendedPreset || inputRow),
  };
}

function setSettingsFlash(type, text) {
  state.saveState = { type, text };
  if (!text) {
    el.settingsFlash.className = "flash hidden";
    el.settingsFlash.textContent = "";
    return;
  }
  el.settingsFlash.className = `flash ${type}`;
  el.settingsFlash.textContent = text;
}

const REALTIME_ROW_STALE_SECONDS = 900;

function rowActivityTime(row) {
  const detail = row?.detail || {};
  return row?.updated_at || row?.event_time || row?.created_at || row?.trade_time || detail.received_at || detail.trade_time || "";
}

function isFreshRealtimeRow(row) {
  const timestamp = rowActivityTime(row);
  if (!timestamp) return true;
  return secondsSince(timestamp) <= REALTIME_ROW_STALE_SECONDS;
}

function currentLiveCollections() {
  const buyRows = (state.buySignals || []).filter(isFreshRealtimeRow);
  const sellRows = (state.sellSignals || []).filter(isFreshRealtimeRow);
  const earlyRows = (state.earlyDetectionRows || []).filter(isFreshRealtimeRow);
  const focusedRows = (state.focusedRows || []).filter(isFreshRealtimeRow);
  const liveRowCount = buyRows.length + sellRows.length + earlyRows.length + focusedRows.length;
  const baseMode = state.status?.dashboard_source_mode || "last_market";
  const effectiveMode = baseMode === "live"
    ? "live"
    : liveRowCount > 0
      ? "partial_live"
      : baseMode;
  return { buyRows, sellRows, earlyRows, focusedRows, liveRowCount, effectiveMode };
}

function sourceModeStatus(status) {
  const mode = currentLiveCollections().effectiveMode || status.dashboard_source_mode || "last_market";
  const liveState = status.live_state || "stopped";
  if (mode === "live" && liveState === "ok") return { label: "live 정상", tone: "ok", note: "실시간 데이터가 정상적으로 들어오고 있습니다." };
  if (mode === "live" && liveState === "delayed") return { label: "live 지연", tone: "pending", note: "최근 틱 수신이 지연되고 있어 마지막 데이터가 유지되고 있습니다." };
  if (mode === "live" && liveState === "stale") return { label: "live stale", tone: "warn", note: "실시간 데이터가 잠시 멈춰 마지막 값을 유지 중입니다." };
  if (mode === "live") return { label: "live 멈춤", tone: "error", note: "러너가 live 상태를 유지하지 못해 마지막 데이터를 잡고 있습니다." };
  if (mode === "fallback") return { label: "snapshot fallback", tone: "warn", note: status.fallback_reason || "현재는 마지막 시장 기준 데이터를 보여주고 있습니다." };
  if (mode === "last_market") return { label: "last_market", tone: "info", note: "현재는 마지막 시장 기준 데이터를 보여주고 있습니다." };
  return { label: "확인 중", tone: "info", note: "실시간 상태를 확인하는 중입니다." };
}

function effectiveSourceModeStatus(status) {
  const mode = currentLiveCollections().effectiveMode || status.dashboard_source_mode || "last_market";
  const liveState = status.live_state || "stopped";
  if (mode === "live" && liveState === "ok") {
    return { label: "live 정상", tone: "ok", note: "실시간 데이터가 정상적으로 들어오고 있습니다." };
  }
  if (mode === "live" && liveState === "delayed") {
    return { label: "live 지연", tone: "pending", note: "최근 틱 수신이 지연되고 있어 마지막 데이터가 유지되고 있습니다." };
  }
  if (mode === "live" && liveState === "stale") {
    return { label: "live stale", tone: "warn", note: "실시간 데이터 갱신이 잠시 멈춰 마지막 값을 유지하고 있습니다." };
  }
  if (mode === "live") {
    return { label: "live 멈춤", tone: "error", note: "실시간 상태를 확인하지 못해 마지막 값 유지 여부를 점검 중입니다." };
  }
  if (mode === "partial_live") {
    return { label: "partial live", tone: "pending", note: "실시간 후보 흐름이 일부 남아 있어 live 후보와 시장 흐름 row를 함께 보여주고 있습니다." };
  }
  if (mode === "fallback") {
    return { label: "snapshot fallback", tone: "warn", note: status.fallback_reason || "현재는 snapshot fallback 상태입니다." };
  }
  if (mode === "last_market") {
    return { label: "last_market", tone: "info", note: "현재는 마지막 시장 기준 데이터를 보여주고 있습니다." };
  }
  return { label: "확인 중", tone: "info", note: "실시간 상태를 확인하는 중입니다." };
}

function heartbeatStatus(status) {
  const age = secondsSince(status.producer_heartbeat_at || status.updated_at);
  if (!status.producer_heartbeat_at && !status.updated_at) return { label: "producer 미시작", tone: "warn", note: "producer가 아직 시작되지 않았습니다." };
  if (age <= 15) return { label: "정상", tone: "ok", note: `최근 ${age}초 전에 heartbeat가 갱신됐습니다.` };
  if (age <= 45) return { label: "지연", tone: "pending", note: `최근 ${age}초 전에 heartbeat가 들어왔습니다.` };
  return { label: "멈춤 의심", tone: "error", note: `${age}초 동안 heartbeat가 갱신되지 않았습니다.` };
}

function settingsReflectionStatus(status) {
  const savedAt = status.last_settings_save_at || state.settingsRow?.updated_at || "";
  const appliedAt = status.signal_settings_applied_at || "";
  if (state.settingsFetchState?.status === "stale-keep") {
    return {
      label: "마지막 성공 상태 유지",
      tone: "warn",
      note: state.settingsFetchState.note || "설정 읽기 실패로 마지막 성공 상태를 유지하고 있습니다.",
    };
  }
  if (!savedAt) return { label: "확인 중", tone: "info", note: "아직 저장된 설정 시각을 받지 못했습니다." };
  if (!appliedAt) return { label: "반영 대기", tone: "pending", note: `저장 ${formatDateTime(savedAt)} / 러너가 새 기준을 읽는 중입니다.` };
  const savedMs = new Date(savedAt).getTime();
  const appliedMs = new Date(appliedAt).getTime();
  if (!Number.isNaN(savedMs) && !Number.isNaN(appliedMs) && appliedMs >= savedMs - 1000) {
    const autoEnabled = !!(status.effective_signal_settings ? status.auto_preset_enabled : state.settingsRow?.auto_preset_enabled);
    return {
      label: autoEnabled ? "자동추천 반영 완료" : "수동 설정 반영 완료",
      tone: "ok",
      note: autoEnabled
        ? `저장 ${formatDateTime(savedAt)} / 적용 ${formatDateTime(appliedAt)} / 자동추천이 현재 값을 덮어쓸 수 있습니다.`
        : `저장 ${formatDateTime(savedAt)} / 적용 ${formatDateTime(appliedAt)} / 수동 설정 유지 중입니다.`,
    };
  }
  return { label: "반영 대기", tone: "pending", note: `저장 ${formatDateTime(savedAt)} / 마지막 적용 ${formatDateTime(appliedAt)}` };
}

function diagnosticsStatus(status) {
  if (!status.settings_table_available) return { label: "signal_settings 미구성", tone: "warn", note: "signal_settings 테이블이 아직 없어 기본 설정으로 동작 중입니다." };
  if (!status.presets_table_available) return { label: "preset fallback 사용 중", tone: "warn", note: "signal_presets가 없어 내장 추천값을 사용 중입니다." };
  if (status.last_error_message) return { label: status.last_error_code || "최근 오류 있음", tone: "error", note: status.last_error_message };
  return { label: "최근 오류 없음", tone: "ok", note: "최근 진단 항목에서 치명적인 오류를 받지 않았습니다." };
}

function sortHistoryRows(rows) {
  const copied = [...rows];
  if (state.historySort === "pnl_desc") copied.sort((a, b) => numberOrZero(b.realized_pnl_pct ?? b.current_pnl_pct) - numberOrZero(a.realized_pnl_pct ?? a.current_pnl_pct));
  else if (state.historySort === "holding_desc") copied.sort((a, b) => numberOrZero(b.holding_seconds) - numberOrZero(a.holding_seconds));
  else if (state.historySort === "score_desc") copied.sort((a, b) => numberOrZero(b.score_at_entry ?? b.score_at_exit ?? 0) - numberOrZero(a.score_at_entry ?? a.score_at_exit ?? 0));
  else copied.sort((a, b) => String(b.updated_at || b.reference_time || "").localeCompare(String(a.updated_at || a.reference_time || "")));
  return copied;
}

function historyDateKey(row) {
  const value = row.entry_time || row.reference_time || row.updated_at || "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "기타";
  return date.toISOString().slice(0, 10);
}

function filteredHistoryRows() {
  let rows = [...state.historyRows];
  if (state.historyStatusFilter !== "ALL") {
    rows = rows.filter((row) => {
      if (state.historyStatusFilter === "OPEN") return row.status === "OPEN";
      if (state.historyStatusFilter === "CLOSED") return row.status === "CLOSED";
      return String(row.result_status || "") === state.historyStatusFilter;
    });
  }
  if (state.historySignalFilter !== "ALL") rows = rows.filter((row) => (row.buy_signal_type || row.sell_signal_type || "") === state.historySignalFilter);
  if (state.historyPresetFilter !== "ALL") rows = rows.filter((row) => (row.preset_label || row.preset_name || "") === state.historyPresetFilter);
  if (state.historyDateFilter !== "ALL") rows = rows.filter((row) => historyDateKey(row) === state.historyDateFilter);
  if (state.historySectorFilter !== "ALL") rows = rows.filter((row) => (row.sector || "섹터 확인 중") === state.historySectorFilter);
  if (state.historySymbolQuery.trim()) {
    const query = state.historySymbolQuery.trim().toLowerCase();
    rows = rows.filter((row) => String(row.name || "").toLowerCase().includes(query) || String(row.code || "").toLowerCase().includes(query));
  }
  return sortHistoryRows(rows);
}

function summarizeCounts(rows, keyFn, prefix = "") {
  const counts = {};
  rows.forEach((row) => {
    const key = keyFn(row);
    if (!key) return;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([label, count]) => `${prefix}${label} ${count}건`);
}

function historyAnalytics(rows) {
  const closed = rows.filter((row) => row.status === "CLOSED");
  const wins = closed.filter((row) => numberOrZero(row.realized_pnl_pct) > 0);
  const openRows = rows.filter((row) => row.status === "OPEN");
  const sessionSummary = parseMaybeJson(state.sessionReport?.summary, {});
  const overall = sessionSummary.overall || {};
  const candidateSummary = sessionSummary.candidate_summary || {};
  const detectionSummary = safeArray(sessionSummary.by_detection_type);
  const conversionSummary = safeArray(sessionSummary.by_conversion);
  const avgClosedPnl = closed.length ? closed.reduce((sum, row) => sum + numberOrZero(row.realized_pnl_pct), 0) / closed.length : 0;
  const avgHolding = rows.length ? rows.reduce((sum, row) => sum + numberOrZero(row.holding_seconds), 0) / rows.length : 0;
  const winRate = closed.length ? (wins.length / closed.length) * 100 : 0;

  return {
    cards: [
      { label: "오늘 매수 신호", value: String(sessionSummary.today_buy_signals ?? state.buySignals.length), note: "오늘 발생한 매수 이벤트 수입니다." },
      { label: "오늘 매도 신호", value: String(sessionSummary.today_sell_signals ?? state.sellSignals.length), note: "오늘 발생한 매도 이벤트 수입니다." },
      { label: "종료 거래", value: String(overall.closed_count ?? closed.length), note: `진행 중 ${overall.open_count ?? openRows.length}건` },
      { label: "평균 수익률", value: `${numberOrZero(overall.avg_pnl_pct ?? avgClosedPnl).toFixed(2)}%`, note: `승률 ${numberOrZero(overall.win_rate ?? winRate).toFixed(1)}%` },
      { label: "초기 포착", value: String(candidateSummary.early_detection_count ?? 0), note: "전체 유니버스 탐지층에서 먼저 포착한 후보 수입니다." },
      { label: "후보 승격", value: String(candidateSummary.promotion_count ?? 0), note: "집중 실시간 감시 대상으로 승격된 후보 수입니다." },
      {
        label: "후보→신호 전환",
        value: `${numberOrZero(candidateSummary.candidate_to_signal_conversion_rate).toFixed(1)}%`,
        note: `평균 ${numberOrZero(candidateSummary.avg_minutes_to_signal).toFixed(1)}분 안에 확정 신호로 이어졌습니다.`,
      },
    ],
    chips: [
      `기록 ${rows.length}건`,
      `종료 ${closed.length}건`,
      `진행 중 ${openRows.length}건`,
      `평균 보유 ${rows.length ? formatHolding(avgHolding) : "-"}`,
      `평균 수익률 ${closed.length ? avgClosedPnl.toFixed(2) : "0.00"}%`,
      `초기 포착 ${candidateSummary.early_detection_count ?? 0}건`,
      `집중 감시 승격 ${candidateSummary.promotion_count ?? 0}건`,
      `실패/강등 ${candidateSummary.demotion_count ?? 0}건`,
    ],
    summaries: [
      ...summarizeCounts(closed, (row) => row.buy_signal_type || row.sell_signal_type || "기타", "신호 "),
      ...summarizeCounts(closed, (row) => row.preset_label || row.preset_name || "사용자 설정", "preset "),
      ...summarizeCounts(closed, (row) => row.sector || "기타", "섹터 "),
      ...summarizeCounts(closed, (row) => row.result_status || row.status || "기타", "결과 "),
      ...detectionSummary.slice(0, 2).map((item) => `초기 포착 ${item.label} ${item.count}건`),
      ...conversionSummary.slice(0, 2).map((item) => `전환 ${item.label} ${item.count}건`),
    ].slice(0, 8),
  };
}

function activateTab(tabName) {
  state.activeTab = tabName;
  el.tabButtons.forEach((button) => {
    const active = button.dataset.tabButton === tabName;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  el.tabPanels.forEach((panel) => {
    const active = panel.dataset.tabPanel === tabName;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}

function renderDiagnosticList(container, rows, emptyMessage, mapRow) {
  if (!rows.length) {
    container.innerHTML = `<div class="empty">${escapeHtml(emptyMessage)}</div>`;
    return;
  }
  container.innerHTML = rows.map(mapRow).join("");
}

function renderStatus() {
  const status = state.status || {};
  const sourceInfo = effectiveSourceModeStatus(status);
  const heartbeatInfo = heartbeatStatus(status);
  const settingsInfo = settingsReflectionStatus(status);
  const diagnosticsInfo = diagnosticsStatus(status);
  const effective = status.effective_signal_settings || {};
  const liveFreshness = numberOrZero(status.live_data_freshness_seconds);

  el.marketStatusLabel.textContent = status.market_phase_label || status.market_status_label || "확인 중";
  el.sourceModeLabel.textContent = sourceInfo.label;
  el.activePresetLabel.textContent = status.active_preset_label || status.selected_preset_label || "확인 중";
  el.settingsAppliedLabel.textContent = settingsInfo.label;
  el.heartbeatLabel.textContent = heartbeatInfo.label;
  el.lastSignalLabel.textContent = formatDateTime(status.last_signal_at);
  el.statusNotice.textContent = sourceInfo.note || status.notice_text;
  const hasQuietMobileNotice = !(
    diagnosticsInfo.tone === "error"
    || diagnosticsInfo.tone === "warn"
    || sourceInfo.tone === "warn"
    || sourceInfo.tone === "pending"
    || status.ready_check_status === "fail"
    || status.ready_check_status === "warn"
    || Boolean(status.last_error_code || status.last_error_message)
  );
  el.statusNotice.classList.toggle("is-quiet", hasQuietMobileNotice);
  const chips = [
    { text: `전체 ${status.total_universe_count || status.watchlist_count || 0}종목`, tone: "info" },
    { text: `후보 ${status.current_candidate_count || 0}종목`, tone: "pending" },
    { text: `집중 감시 ${status.current_focused_watchlist_count || status.live_watchlist_count || 0}종목`, tone: "info" },
    { text: `live tick ${status.live_tick_count || 0}`, tone: "info" },
    { text: `freshness ${liveFreshness}초`, tone: sourceInfo.tone },
    { text: `매수 ${status.buy_signal_count || 0}건`, tone: "buy" },
    { text: `매도 ${status.sell_signal_count || 0}건`, tone: "sell" },
    { text: `열린 포지션 ${status.open_position_count || 0}건`, tone: "pending" },
    { text: `전환율 ${numberOrZero(status.candidate_to_signal_conversion_rate).toFixed(1)}%`, tone: "ok" },
    { text: status.validation_mode_enabled ? "validation mode 켜짐" : "validation mode 꺼짐", tone: status.validation_mode_enabled ? "warn" : "info" },
    { text: diagnosticsInfo.label, tone: diagnosticsInfo.tone },
  ];
  el.statusChips.innerHTML = chips
    .map((item) => `<span class="chip ${escapeHtml(item.tone)}">${escapeHtml(item.text)}</span>`)
    .join("");

  const detailCards = [
    {
      label: "현재 적용 중인 기준",
      value: status.active_preset_label || "확인 중",
      note: status.active_preset_reason || "현재 시간대와 설정에 맞는 기준을 적용하고 있습니다.",
    },
    {
      label: "실시간 freshness",
      value: `${status.live_state || "stopped"} / ${liveFreshness}초`,
      note: `마지막 live tick ${formatDateTime(status.live_last_tick_at)}`,
    },
    {
      label: "설정 반영 상태",
      value: settingsInfo.label,
      note: settingsInfo.note,
    },
    {
      label: "최근 설정 변경",
      value: changedSourceLabel(status.settings_changed_source || state.settingsRow?.changed_source),
      note: status.settings_change_reason || state.settingsRow?.change_reason || "최근 변경 사유를 아직 받지 못했습니다.",
    },
    {
      label: "마지막 신호",
      value: formatDateTime(status.last_signal_at),
      note: `매수 ${formatDateTime(status.last_buy_signal_at)} / 매도 ${formatDateTime(status.last_sell_signal_at)}`,
    },
    {
      label: "snapshot 갱신",
      value: formatDateTime(status.last_market_refreshed_at),
      note: `snapshot age ${numberOrZero(status.snapshot_age_seconds)}초 / ${status.last_market_row_count || 0}행`,
    },
    {
      label: "상대 기준 요약",
      value: `비교 ${effective.compare_window_minutes || "-"}분 / RVOL ${numberOrZero(effective.rvol_threshold).toFixed(2)}`,
      note: `turnover ${formatRatioPct(effective.turnover_ratio_threshold)} / 신호점수 ${numberOrZero(effective.min_signal_score).toFixed(0)}점`,
    },
    {
      label: "탐지층 요약",
      value: `스캔 ${numberOrZero(effective.broad_scan_window_minutes).toFixed(0)}분 / 후보 ${numberOrZero(effective.candidate_threshold).toFixed(0)}점`,
      note: `초기 RVOL ${numberOrZero(effective.early_rvol_threshold).toFixed(2)} / 초기 turnover ${formatRatioPct(effective.early_turnover_threshold)}`,
    },
    {
      label: "안전 하한 / 보조 기준",
      value: `거래대금 ${formatEok(effective.min_trade_value_eok || 0)}`,
      note: "절대 거래대금은 메인 기준이 아니라 유동성이 너무 약한 경우만 걸러내는 안전 하한입니다.",
    },
  ];
  const detailMarkup = detailCards.map((item) => `
    <article class="status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
  el.statusDetailGrid.innerHTML = detailMarkup;
  if (el.mobileStatusDetailGrid) {
    el.mobileStatusDetailGrid.innerHTML = detailMarkup;
  }

  const operationCards = [
    { label: "운영 모드", value: sourceInfo.label, note: sourceInfo.note },
    { label: "producer heartbeat", value: heartbeatInfo.label, note: heartbeatInfo.note },
    { label: "최근 오류", value: status.last_error_code || "없음", note: status.last_error_message || "최근 오류가 없습니다." },
    { label: "fallback 사유", value: status.fallback_reason || "없음", note: status.dashboard_source_mode === "live" ? "현재는 live 데이터를 우선 사용 중입니다." : "live가 아니면 last_market 또는 fallback 문구가 함께 표시됩니다." },
    { label: "탐지 진행도", value: `${status.broad_scan_processed_count || 0}/${status.total_universe_count || status.watchlist_count || 0}`, note: `후보 ${status.current_candidate_count || 0}개 / 집중 감시 ${status.current_focused_watchlist_count || status.live_watchlist_count || 0}개` },
    { label: "감시 규모", value: `${status.live_shard_count || 0} shard / ${status.live_codes_per_session || 0}개`, note: `승격 ${status.candidate_promotions_today || 0}회 / 강등 ${status.candidate_demotions_today || 0}회` },
    { label: "진단 상태", value: diagnosticsInfo.label, note: diagnosticsInfo.note },
  ];
  const operationsMarkup = operationCards.map((item) => `
    <article class="status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
  el.operationsGrid.innerHTML = operationsMarkup;
  if (el.mobileOperationsGrid) {
    el.mobileOperationsGrid.innerHTML = operationsMarkup;
  }

  const notes = [...safeArray(status.runtime_notes), ...Array.from(state.setupNotes)];
  el.runtimeNotes.innerHTML = notes.length
    ? notes.map((note) => {
      const tone = note.includes("오류")
        ? "error"
        : note.includes("fallback") || note.includes("없어") || note.includes("휴장")
          ? "warn"
          : "";
      return `<div class="note-item ${tone}">${escapeHtml(note)}</div>`;
    }).join("")
    : `<div class="empty">운영 메모가 아직 없습니다.</div>`;

  if (el.mobileRuntimeNotes) {
    el.mobileRuntimeNotes.innerHTML = el.runtimeNotes.innerHTML;
  }

  renderDiagnosticList(
    el.diagnosticList,
    state.diagnosticsRows,
    "최근 진단 기록이 아직 없습니다.",
    (row) => `
      <article class="diagnostic-item ${escapeHtml(String(row.severity || "info").toLowerCase())}">
        <strong>
          <span>${escapeHtml(row.kind || "diagnostic")}</span>
          <span>${escapeHtml(formatDateTime(row.created_at))}</span>
        </strong>
        <p>${escapeHtml(row.message || "상세 메시지가 없습니다.")}</p>
      </article>
    `,
  );

  renderDiagnosticList(
    el.validationList,
    state.validationRows,
    "운영 검증 기록이 아직 없습니다.",
    (row) => `
      <article class="diagnostic-item info">
        <strong>
          <span>${escapeHtml(row.event_type || "validation")}</span>
          <span>${escapeHtml(formatDateTime(row.created_at || row.event_time))}</span>
        </strong>
        <p>${escapeHtml(`${row.name || row.code || "대상 없음"} / ${row.signal_type || "신호 없음"} / ${row.preset_name || "preset 없음"}`)}</p>
      </article>
    `,
  );
  if (el.mobileDiagnosticList) {
    renderDiagnosticList(
      el.mobileDiagnosticList,
      state.diagnosticsRows,
      "理쒓렐 吏꾨떒 湲곕줉???꾩쭅 ?놁뒿?덈떎.",
      (row) => `
        <article class="diagnostic-item ${escapeHtml(String(row.severity || "info").toLowerCase())}">
          <strong>
            <span>${escapeHtml(row.kind || "diagnostic")}</span>
            <span>${escapeHtml(formatDateTime(row.created_at))}</span>
          </strong>
          <p>${escapeHtml(row.message || "?곸꽭 硫붿떆吏媛 ?놁뒿?덈떎.")}</p>
        </article>
      `,
    );
  }
  if (el.mobileValidationList) {
    renderDiagnosticList(
      el.mobileValidationList,
      state.validationRows,
      "理쒓렐 寃利?湲곕줉???꾩쭅 ?놁뒿?덈떎.",
      (row) => `
        <article class="diagnostic-item ${escapeHtml(String(row.severity || "info").toLowerCase())}">
          <strong>
            <span>${escapeHtml(row.kind || "validation")}</span>
            <span>${escapeHtml(formatDateTime(row.created_at || row.event_time))}</span>
          </strong>
          <p>${escapeHtml(row.message || row.summary || "?곸꽭 硫붿떆吏媛 ?놁뒿?덈떎.")}</p>
        </article>
      `,
    );
  }
}

function syncSettingsInputs(inputRow) {
  el.autoPresetEnabled.checked = !!inputRow.auto_preset_enabled;
  el.sectorStrengthBonusEnabled.checked = !!inputRow.sector_strength_bonus_enabled;
  el.adaptiveTuningEnabled.checked = !!inputRow.adaptive_tuning_enabled;
  el.broadScanWindowMinutes.value = inputRow.broad_scan_window_minutes;
  el.candidateThreshold.value = inputRow.candidate_threshold;
  el.earlySurgeThreshold.value = inputRow.early_surge_threshold;
  el.earlyRvolThreshold.value = inputRow.early_rvol_threshold;
  el.earlyTurnoverThreshold.value = inputRow.early_turnover_threshold;
  el.sectorLeaderSensitivity.value = inputRow.sector_leader_sensitivity;
  el.candidateQualityThreshold.value = inputRow.candidate_quality_threshold;
  el.focusedPromotionThreshold.value = inputRow.focused_promotion_threshold;
  el.candidateExpiryMinutes.value = inputRow.candidate_expiry_minutes;
  el.overextensionPenaltyStrength.value = inputRow.overextension_penalty_strength;
  el.tailRiskPenaltyStrength.value = inputRow.tail_risk_penalty_strength;
  el.recentFailurePenaltyStrength.value = inputRow.recent_failure_penalty_strength;
  el.surgePctThreshold.value = inputRow.surge_pct_threshold;
  el.compareWindowMinutes.value = inputRow.compare_window_minutes;
  el.minTradeValueEok.value = inputRow.min_trade_value_eok;
  el.minSignalScore.value = inputRow.min_signal_score;
  el.confirmedBreakoutSensitivity.value = inputRow.confirmed_breakout_sensitivity;
  el.confirmedMomentumSensitivity.value = inputRow.confirmed_momentum_sensitivity;
  el.trailingStopPct.value = inputRow.trailing_stop_pct;
  el.takeProfitPct.value = inputRow.take_profit_pct;
  el.stopLossPct.value = inputRow.stop_loss_pct;
  el.rvolThreshold.value = inputRow.rvol_threshold;
  el.turnoverRatioThreshold.value = inputRow.turnover_ratio_threshold;
}

function renderSettings() {
  const { inputRow, activePreset, recommendedPreset, effective, inputSnapshot, selectedPresetSnapshot } = currentComparisonState();
  const autoEnabled = !!inputRow.auto_preset_enabled;

  el.selectedPresetName.innerHTML = state.presetRows
    .map((row) => `<option value="${escapeHtml(row.preset_name)}">${escapeHtml(row.label)}</option>`)
    .join("");
  el.selectedPresetName.value = inputRow.selected_preset_name || recommendedPreset.preset_name;
  syncSettingsInputs(inputRow);

  const effectiveDiffCount = SETTINGS_FIELDS.filter((field) => {
    const inputValue = inputSnapshot[field.key];
    const effectiveValue = effective[field.key];
    if (field.type === "bool") return Boolean(inputValue) !== Boolean(effectiveValue);
    return !approxEqual(inputValue, effectiveValue);
  }).length;

  el.settingsSummary.textContent = autoEnabled
    ? `자동 추천이 켜져 있어 현재는 ${activePreset.label} 기준이 우선 적용됩니다. 입력값과 추천값, 실제 적용값을 함께 비교할 수 있습니다.`
    : "수동 입력값을 기준으로 신호를 판단합니다. 입력값과 현재 적용값을 함께 비교해 보세요.";

  el.settingsMeta.innerHTML = [
    {
      label: "입력값 저장 시각",
      value: formatDateTime(inputRow.updated_at),
      note: `${changedSourceLabel(inputRow.changed_source)} / ${inputRow.change_reason || "최근 저장 사유 없음"}`,
    },
    {
      label: "추천 preset",
      value: recommendedPreset.label,
      note: recommendedPreset.reason || "현재 시간대에 맞는 추천 기준입니다.",
    },
    {
      label: "현재 적용값",
      value: activePreset.label,
      note: `${formatDateTime(state.status?.signal_settings_applied_at)} 기준으로 러너가 사용 중입니다.`,
    },
    {
      label: "입력값과 차이",
      value: effectiveDiffCount ? `${effectiveDiffCount}개 항목 조정됨` : "입력값과 동일",
      note: autoEnabled ? "자동 추천이 켜져 있으면 시간대에 따라 일부 값이 추천 preset 기준으로 덮어씌워질 수 있습니다." : "자동 추천이 꺼져 있어 저장한 값이 그대로 적용됩니다.",
    },
  ].map((item) => `
    <article class="meta-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");

  el.settingsHelpList.innerHTML = SETTINGS_FIELDS.map((field) => `
    <article class="help-card">
      <span class="field-badge">${escapeHtml(field.section === "advanced" ? "고급" : "핵심")}</span>
      <strong>${escapeHtml(field.label)}</strong>
      <p>${escapeHtml(field.shortHelp)}</p>
      <p>${escapeHtml(field.detailHelp)}</p>
    </article>
  `).join("");

  el.presetRow.innerHTML = state.presetRows.map((preset) => {
    const active = preset.preset_name === (state.status?.active_preset_name || inputRow.active_preset_name);
    return `
      <article class="preset-card">
        <strong>${escapeHtml(preset.label)}</strong>
        <span>${active ? "현재 적용 중" : "추천값"}</span>
        <p>${escapeHtml(preset.description || "")}</p>
        <div class="chips">
          <span class="chip">비교 ${escapeHtml(formatThresholdValue("compare_window_minutes", preset.compare_window_minutes))}</span>
          <span class="chip">RVOL ${escapeHtml(formatThresholdValue("rvol_threshold", preset.rvol_threshold))}</span>
          <span class="chip">turnover ${escapeHtml(formatThresholdValue("turnover_ratio_threshold", preset.turnover_ratio_threshold))}</span>
          <span class="chip">신호점수 ${escapeHtml(formatThresholdValue("min_signal_score", preset.min_signal_score))}</span>
        </div>
        <p>거래대금 안전 하한 ${escapeHtml(formatThresholdValue("min_trade_value_eok", preset.min_trade_value_eok))}</p>
        <div class="button-row" style="margin-top:12px;">
          <button class="secondary" data-preset="${escapeHtml(preset.preset_name)}" type="button">추천값 적용</button>
        </div>
      </article>
    `;
  }).join("");

  el.settingsCompareIntro.textContent = autoEnabled
    ? "자동 추천이 켜져 있으면 시간대에 맞는 추천 preset 값이 현재 적용값에 우선 반영될 수 있습니다."
    : "수동 입력값이 그대로 적용되며, 현재 적용값 열에서 러너가 실제 사용 중인 기준을 확인할 수 있습니다.";

  el.settingsCompareBody.innerHTML = SETTINGS_FIELDS.map((field) => {
    const inputValue = inputSnapshot[field.key];
    const recommendedValue = selectedPresetSnapshot[field.key];
    const effectiveValue = effective[field.key];
    const changed = field.type === "bool" ? Boolean(inputValue) !== Boolean(effectiveValue) : !approxEqual(inputValue, effectiveValue);
    return `
      <tr>
        <td>
          <strong>${escapeHtml(field.label)}</strong>
          <small>${escapeHtml(field.section === "advanced" ? "고급 설정" : "핵심 설정")}</small>
        </td>
        <td><span class="comparison-value">${escapeHtml(formatThresholdValue(field.key, inputValue))}</span></td>
        <td><span class="comparison-value">${escapeHtml(formatThresholdValue(field.key, recommendedValue))}</span></td>
        <td>
          <span class="comparison-value">
            ${escapeHtml(formatThresholdValue(field.key, effectiveValue))}
            ${changed ? '<span class="override-mark">입력값과 다름</span>' : ""}
          </span>
        </td>
      </tr>
    `;
  }).join("");

  setSettingsFlash(state.saveState.type, state.saveState.text);
}

function renderSignalList(container, rows, side) {
  upsertDetailIndex(rows);
  const effectiveMode = currentLiveCollections().effectiveMode;
  const liveMode = effectiveMode === "live" || effectiveMode === "partial_live";
  if (!rows.length) {
    container.innerHTML = `<div class="empty">${
      side === "BUY"
        ? liveMode
          ? "아직 조건을 통과한 실시간 매수 신호가 없습니다."
          : "현재는 장외 상태라 실시간 매수 신호 대신 마지막 시장 기준 보드를 먼저 확인해 주세요."
        : liveMode
          ? "아직 매도 판단 기준을 통과한 실시간 매도 신호가 없습니다."
          : "현재는 장외 상태라 실시간 매도 신호 대신 마지막 시장 기준 보드를 먼저 확인해 주세요."
    }</div>`;
    return;
  }

  container.innerHTML = rows.map((row) => {
    const detail = detailFromRow(row);
    const key = row.signal_id || row.position_id || row.code;
    const summary = signalSummaryText(row, detail, side);
    const changeValue = detail.change_rate || row.change_rate || 0;
    return `
      <article class="signal-card ${side === "BUY" ? "buy" : "sell"}">
        <div class="signal-head">
          <div>
            <h3>${escapeHtml(row.name)} <span class="muted">${escapeHtml(row.code)}</span></h3>
            <div class="signal-meta">${escapeHtml(row.market || "-")} / ${escapeHtml(row.sector || "섹터 확인 중")} / ${escapeHtml(row.signal_type || detail.signal_type || "-")}</div>
          </div>
          <div class="button-row">
            <span class="tag ${side === "BUY" ? "buy" : "sell"}">${side === "BUY" ? "매수" : "매도"}</span>
            <button class="ghost" data-detail-id="${escapeHtml(key)}" type="button">자세히</button>
          </div>
        </div>
        <p class="signal-summary">${escapeHtml(summary)}</p>
        <div class="signal-tags">
          <span class="tag">현재가 ${escapeHtml(formatPrice(row.price || detail.current_price || 0))}</span>
          <span class="tag">신호점수 ${numberOrZero(row.score || detail.signal_score).toFixed(1)}</span>
          <span class="tag">RVOL ${numberOrZero(detail.rvol).toFixed(2)}</span>
          <span class="tag">최근 ${numberOrZero(detail.compare_window_minutes).toFixed(0)}분 ${formatPct(detail.recent_change_pct)}</span>
          <span class="tag">turnover ${formatRatioPct(detail.turnover_ratio)}</span>
          <span class="tag">${escapeHtml(detail.active_preset_label || row.preset_label || "사용자 설정")}</span>
        </div>
      </article>
    `;
  }).join("");
}

function renderMobilePrioritySummary() {
  if (!el.mobileStatusSummary) return;
  const status = state.status || {};
  const sourceInfo = effectiveSourceModeStatus(status);
  const settingsInfo = settingsReflectionStatus(status);
  const diagnosticsInfo = diagnosticsStatus(status);
  const activePresetName = status.active_preset_name || status.selected_preset_name;
  const activePresetLabel = status.active_preset_label || status.selected_preset_label || "?뺤씤 以?";
  const compactCards = [
    {
      label: "?쒖옣 ?곹깭",
      value: status.market_phase_label || status.market_status_label || "?뺤씤 以?",
      note: status.current_market_regime_label || status.current_market_regime || "?μ꽭 ?댁꽍 ?湲?以?",
    },
    {
      label: "?꾩옱 諛섏쁺 紐⑤뱶",
      value: sourceInfo.label || "?뺤씤 以?",
      note: sourceInfo.note || "?ㅼ떆媛??곗씠??諛섏쁺 ?곹깭瑜?蹂댁뿬以띾땲??",
    },
    {
      label: "?쒖꽦 preset",
      value: activePresetLabel,
      note: isTestPreset(activePresetName)
        ? "?뚯뒪?몄슜 preset?쇰줈 ?꾨낫? focused ?밴꺽???볤쾶 遊낅땲??"
        : status.active_preset_reason || "?꾩옱 ?쒓컙? ?μ꽭瑜?諛섏쁺??preset?낅땲??",
    },
    {
      label: "?ㅼ젙 諛섏쁺 ?곹깭",
      value: settingsInfo.label || "?뺤씤 以?",
      note: settingsInfo.note || "?꾩옱 ?곸슜 以묒씤 ?ㅼ젙 諛섏쁺 ?곹깭瑜?蹂댁뿬以띾땲??",
    },
    {
      label: "경고 여부",
      value: diagnosticsInfo.label || "확인 중",
      note: diagnosticsInfo.note || "운영상 먼저 확인해야 할 경고 상태를 보여줍니다.",
    },
  ];
  el.mobileStatusSummary.innerHTML = compactCards.map((item) => `
    <article class="status-item mobile-status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
  return;
  const cards = [
    {
      label: "시장 상태",
      value: status.market_phase_label || status.market_status_label || "확인 중",
      note: status.current_market_regime_label || status.current_market_regime || "장세 해석 대기 중",
    },
    {
      label: "실시간 상태",
      value: sourceInfo.label || "확인 중",
      note: `live ${status.live_state || "-"} / freshness ${liveFreshness.toFixed(0)}초`,
    },
    {
      label: "heartbeat",
      value: heartbeatInfo.label || "확인 중",
      note: `마지막 틱 ${formatDateTime(status.live_last_tick_at)}`,
    },
    {
      label: "tape recording",
      value: status.tape_recording_enabled ? "기록 중" : "꺼짐",
      note: `rows ${status.recorded_tape_row_count || 0} / last ${formatDateTime(status.last_tape_write_time)}`,
    },
  ];

  el.mobileStatusSummary.innerHTML = cards.map((item) => `
    <article class="status-item mobile-status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
}

function decorateResponsiveTables() {
  document.querySelectorAll(".responsive-table").forEach((table) => {
    const headers = Array.from(table.querySelectorAll("thead th")).map((cell) => cell.textContent.trim() || "");
    table.querySelectorAll("tbody tr").forEach((row) => {
      Array.from(row.children).forEach((cell, index) => {
        if (!(cell instanceof HTMLElement)) return;
        if (!cell.dataset.label) {
          cell.dataset.label = headers[index] || "";
        }
      });
    });
  });
}

function syncMobileOperationalPanels() {
  if (el.mobileStatusDetailGrid) {
    el.mobileStatusDetailGrid.innerHTML = el.statusDetailGrid?.innerHTML || "";
  }
  if (el.mobileOperationsGrid) {
    el.mobileOperationsGrid.innerHTML = el.operationsGrid?.innerHTML || "";
  }
  if (el.mobileRuntimeNotes) {
    el.mobileRuntimeNotes.innerHTML = el.runtimeNotes?.innerHTML || "";
  }
  if (el.mobileDiagnosticList) {
    el.mobileDiagnosticList.innerHTML = el.diagnosticList?.innerHTML || "";
  }
  if (el.mobileValidationList) {
    el.mobileValidationList.innerHTML = el.validationList?.innerHTML || "";
  }
}

function tableThresholdSummaryV2(snapshot) {
  const values = parseMaybeJson(snapshot, {});
  const scan = values.broad_scan_window_minutes != null ? `${numberOrZero(values.broad_scan_window_minutes).toFixed(0)}분` : "-";
  const candidate = values.candidate_threshold != null ? `${numberOrZero(values.candidate_threshold).toFixed(0)}점` : "-";
  const quality = values.candidate_quality_threshold != null ? `${numberOrZero(values.candidate_quality_threshold).toFixed(0)}점` : "-";
  const promotion = values.focused_promotion_threshold != null ? `${numberOrZero(values.focused_promotion_threshold).toFixed(0)}점` : "-";
  const compare = values.compare_window_minutes != null ? `${numberOrZero(values.compare_window_minutes).toFixed(0)}분` : "-";
  const score = values.min_signal_score != null ? `${numberOrZero(values.min_signal_score).toFixed(0)}점` : "-";
  const rvol = values.rvol_threshold != null ? numberOrZero(values.rvol_threshold).toFixed(2) : "-";
  const turnover = values.turnover_ratio_threshold != null ? formatRatioPct(values.turnover_ratio_threshold) : "-";
  return `스캔 ${scan} / 후보 ${candidate} / 품질 ${quality} / 승격 ${promotion} / 비교 ${compare} / RVOL ${rvol} / turnover ${turnover} / 신호점수 ${score}`;
}

function historyAnalyticsV2(rows) {
  const analytics = historyAnalytics(rows);
  const sessionSummary = parseMaybeJson(state.sessionReport?.summary, {});
  const candidateSummary = sessionSummary.candidate_summary || {};
  const detectionSummary = safeArray(sessionSummary.by_detection_type);
  const conversionSummary = safeArray(sessionSummary.by_conversion);
  const qualityBuckets = safeArray(sessionSummary.by_candidate_quality_bucket);
  const outcomeSummary = safeArray(sessionSummary.by_candidate_outcome);
  const candidateHours = safeArray(sessionSummary.by_candidate_hour);
  const qualityHints = safeArray(candidateSummary.quality_hints);

  analytics.cards = [
    ...analytics.cards,
    {
      label: "초기 포착",
      value: String(candidateSummary.early_detection_count ?? 0),
      note: "전체 유니버스 탐지층에서 먼저 포착한 후보 수입니다.",
    },
    {
      label: "후보 승격",
      value: String(candidateSummary.promotion_count ?? 0),
      note: "집중 실시간 감시 대상으로 승격된 후보 수입니다.",
    },
    {
      label: "후보→신호 전환",
      value: `${numberOrZero(candidateSummary.candidate_to_signal_conversion_rate).toFixed(1)}%`,
      note: `평균 ${numberOrZero(candidateSummary.avg_minutes_to_signal).toFixed(1)}분 안에 확정 신호로 이어졌습니다.`,
    },
    {
      label: "품질 상위군 전환",
      value: `${numberOrZero(candidateSummary.high_quality_conversion_rate).toFixed(1)}%`,
      note: "후보 품질 점수가 높은 구간의 실제 확정 신호 전환율입니다.",
    },
    {
      label: "false positive 후보",
      value: String(candidateSummary.false_positive_candidate_count ?? 0),
      note: `${numberOrZero(candidateSummary.false_positive_candidate_ratio).toFixed(1)}% 비중으로 집계됐습니다.`,
    },
    {
      label: "과열 추격 감점",
      value: `${numberOrZero(candidateSummary.overextended_candidate_ratio).toFixed(1)}%`,
      note: `${candidateSummary.overextended_candidate_count ?? 0}건이 과열 추격 성격으로 분류됐습니다.`,
    },
  ];
  analytics.chips = [
    ...analytics.chips,
    `초기 포착 ${candidateSummary.early_detection_count ?? 0}건`,
    `집중 감시 승격 ${candidateSummary.promotion_count ?? 0}건`,
    `실패/강등 ${candidateSummary.demotion_count ?? 0}건`,
    `실패 승격 ${candidateSummary.failed_after_promotion_count ?? 0}건`,
    `리더 전환 ${candidateSummary.successful_leader_count ?? 0}건`,
  ];
  analytics.summaries = [
    ...analytics.summaries,
    ...detectionSummary.slice(0, 2).map((item) => `초기 포착 ${item.label} ${item.count}건`),
    ...conversionSummary.slice(0, 2).map((item) => `전환 ${item.label} ${item.count}건`),
    ...qualityBuckets.slice(0, 2).map((item) => `품질 ${item.label} ${item.count}건`),
    ...outcomeSummary.slice(0, 2).map((item) => `후보 결과 ${item.label} ${item.count}건`),
    ...candidateHours.slice(0, 1).map((item) => `시간대 ${item.label} ${item.count}건`),
    ...qualityHints.slice(0, 3),
  ].slice(0, 12);
  return analytics;
}

function currentSessionSummary() {
  return parseMaybeJson(state.sessionReport?.summary, {});
}

function recommendationFieldLabel(fieldKey) {
  if (fieldKey === "preset_review") return "preset 검토";
  return fieldByKey(fieldKey)?.label || fieldKey || "조정 항목";
}

function recommendationValueText(fieldKey, value) {
  if (fieldKey === "preset_review") return String(value || "-");
  return formatThresholdValue(fieldKey, value);
}

function confidenceTone(label) {
  return ({
    very_high: "ok",
    high: "buy",
    medium: "info",
    low: "warn",
    very_low: "warn",
  })[String(label || "").trim()] || "warn";
}

function confidenceLabelText(label, fallback) {
  const mapping = {
    very_high: "신뢰도 매우 높음",
    high: "신뢰도 높음",
    medium: "신뢰도 보통",
    low: "신뢰도 낮음",
    very_low: "참고 수준",
  };
  return fallback || mapping[String(label || "").trim()] || "신뢰도 확인 중";
}

function renderRecommendationCards(rows, emptyText) {
  return rows.length
    ? rows.map((item) => {
      const metricChips = Object.entries(item.metrics || {}).map(([metricKey, metricValue]) => `
        <span class="chip">${escapeHtml(recommendationMetricLabel(metricKey))} ${escapeHtml(formatRecommendationMetric(metricKey, metricValue))}</span>
      `).join("");
      const confidenceText = confidenceLabelText(item.recommendation_confidence, item.recommendation_confidence_label);
      let fillButton = `<button class="ghost recommendation-action" type="button" data-tab-target="settings">설정 탭에서 확인</button>`;
      if (item.field && item.field !== "preset_review") {
        fillButton = `<button class="secondary recommendation-action" type="button" data-recommend-field="${escapeHtml(item.field)}" data-recommend-value="${escapeHtml(String(item.recommended_value ?? ""))}">입력값에 채우기</button>`;
      } else if (item.field === "preset_review" && presetByName(item.recommended_value)) {
        fillButton = `<button class="secondary recommendation-action" type="button" data-recommend-preset="${escapeHtml(String(item.recommended_value ?? ""))}">추천 preset 초안 채우기</button>`;
      }
      return `
        <article class="recommendation-card ${item.gated ? "is-gated" : ""}">
          <div class="signal-head">
            <div>
              <h3>${escapeHtml(recommendationFieldLabel(item.field))}</h3>
              <div class="signal-meta">${escapeHtml(item.review_scope_label || "추천")} / 현재 ${escapeHtml(recommendationValueText(item.field, item.current_value))} -> 추천 ${escapeHtml(recommendationValueText(item.field, item.recommended_value))}</div>
            </div>
            <div class="button-row">
              ${fillButton}
            </div>
          </div>
          <p class="signal-summary">${escapeHtml(item.reason || "이번 세션 복기를 바탕으로 다음 운영에서 검토할 만한 제안입니다.")}</p>
          <div class="signal-tags">
            <span class="chip ${escapeHtml(confidenceTone(item.recommendation_confidence))}">${escapeHtml(confidenceText)}</span>
            <span class="chip">표본 ${escapeHtml(numberOrZero(item.sample_size).toFixed(0))}세션</span>
            <span class="chip">${escapeHtml(item.sample_sufficiency_label || item.sample_sufficiency || "표본 확인 중")}</span>
            ${item.gated ? `<span class="chip warn">보수적 해석</span>` : ""}
          </div>
          ${item.sample_note || item.warning_note ? `<p class="small" style="margin-top:10px;">${escapeHtml(item.warning_note || item.sample_note)}</p>` : ""}
          <div class="signal-tags">${metricChips}</div>
        </article>
      `;
    }).join("")
    : `<div class="empty">${escapeHtml(emptyText)}</div>`;
}

function renderRollingReviewCard(review, fallbackText) {
  if (!review || !review.available) {
    return `<article class="analysis-card caution"><strong>${escapeHtml(review?.label || "리뷰")}</strong><p>${escapeHtml(fallbackText)}</p></article>`;
  }
  const topPreset = safeArray(review.top_presets)[0] || {};
  const topPatterns = safeArray(review.repeated_successful_candidate_patterns).slice(0, 2);
  return `
    <article class="analysis-card">
      <strong>${escapeHtml(review.label || "누적 리뷰")}</strong>
      <p>${escapeHtml(`${review.sample_note || "표본이 충분한지 먼저 확인한 뒤 추천을 참고합니다."}`)}</p>
      <div class="chips">
        <span class="chip ${escapeHtml(confidenceTone(review.recommendation_confidence))}">${escapeHtml(confidenceLabelText(review.recommendation_confidence, review.recommendation_confidence_label))}</span>
        <span class="chip">표본 ${escapeHtml(numberOrZero(review.session_count).toFixed(0))}세션</span>
        <span class="chip">${escapeHtml(review.sample_sufficiency_label || review.sample_sufficiency || "표본 확인 중")}</span>
        <span class="chip">${escapeHtml(review.dominant_regime_label || "장세 확인 중")}</span>
      </div>
      <div class="chips">
        ${topPreset.preset_label ? `<span class="chip">상위 preset ${escapeHtml(topPreset.preset_label)}</span>` : ""}
        ${review.regime_matched_preset_label ? `<span class="chip">추천 preset ${escapeHtml(review.regime_matched_preset_label)}</span>` : ""}
        ${topPatterns.map((item) => `<span class="chip">${escapeHtml(item.label || "-")}</span>`).join("")}
      </div>
      ${safeArray(review.recommendations).length ? `<div class="analysis-list" style="margin-top:12px;">${safeArray(review.recommendations).slice(0, 2).map((item) => `
        <article class="analysis-card ${escapeHtml(confidenceTone(item.recommendation_confidence))}">
          <strong>${escapeHtml(recommendationFieldLabel(item.field))}</strong>
          <p>${escapeHtml(item.reason || "")}</p>
        </article>
      `).join("")}</div>` : ""}
    </article>
  `;
}

function renderSignalValidationPanel(summary, previewRows) {
  const gradeRows = safeArray(summary.timing_grade_distribution);
  const classRows = safeArray(summary.timing_classification_distribution);
  const bestSignal = summary.best_timing_signal || {};
  const lateSignal = summary.most_regrettable_signal || {};
  const cards = [
    {
      label: "오늘 검증 신호 수",
      value: `${numberOrZero(summary.signal_count).toFixed(0)}건`,
      note: summary.replay_available ? "focused 종목 tape를 바탕으로 timing quality를 다시 계산했습니다." : "아직 replay용 tape가 충분히 쌓이지 않아 참고 정보가 제한적입니다.",
    },
    {
      label: "적절한 타이밍 비율",
      value: `${numberOrZero(summary.proper_ratio).toFixed(1)}%`,
      note: `이른 신호 ${numberOrZero(summary.early_ratio).toFixed(1)}% / 늦은 신호 ${numberOrZero(summary.late_ratio).toFixed(1)}%`,
    },
    {
      label: "false breakout 의심",
      value: `${numberOrZero(summary.false_breakout_count).toFixed(0)}건`,
      note: `continuation 실패 ${numberOrZero(summary.continuation_failure_count).toFixed(0)}건 / 평균 follow-through ${numberOrZero(summary.avg_follow_through_score).toFixed(1)}점`,
    },
    {
      label: "replay 사용 가능",
      value: summary.replay_available ? "가능" : "표본 부족",
      note: `tape ${numberOrZero(summary.tape_event_count).toFixed(0)}개 / 종목 ${numberOrZero(summary.tape_symbol_count).toFixed(0)}개 / what-if ${summary.what_if_ready ? "준비됨" : "준비 중"}`,
    },
  ];
  const previewHtml = safeArray(previewRows).length
    ? safeArray(previewRows).map((row) => {
      const key = row.validation_id || row.signal_id || row.position_id || row.code;
      const grade = row.side === "BUY" ? row.entry_timing_grade : row.exit_timing_grade;
      return `
        <article class="analysis-card ${escapeHtml(confidenceTone(row.signal_quality_label === "excellent" ? "high" : row.signal_quality_label === "poor" ? "very_low" : "medium"))}">
          <strong>${escapeHtml(row.name || row.code || "검증 신호")}</strong>
          <span>${escapeHtml(sessionEventLabel(row.side === "BUY" ? "buy_signal_validation" : "sell_signal_validation"))}</span>
          <p>${escapeHtml(row.summary || "신호 이후 움직임을 다시 계산한 복기 결과입니다.")}</p>
          <div class="chips">
            <span class="chip">${escapeHtml(row.signal_type || "-")}</span>
            <span class="chip">grade ${escapeHtml(grade || "-")}</span>
            <span class="chip">${escapeHtml(row.timing_classification || "-")}</span>
            <span class="chip">best ${escapeHtml(formatPct(row.best_move_pct_after_signal || 0))}</span>
            <span class="chip">adverse ${escapeHtml(formatPct(-(row.max_adverse_excursion_after_signal || 0)))}</span>
          </div>
          <div class="button-row" style="margin-top:12px;">
            <button class="ghost" data-detail-id="${escapeHtml(key)}" type="button">자세히</button>
          </div>
        </article>
      `;
    }).join("")
    : '<div class="empty">세션 tape가 아직 부족해 signal validation preview가 비어 있습니다. monitor 모드로 장중을 녹화하면 여기서 timing grade를 바로 확인할 수 있습니다.</div>';
  return `
    <div class="history-summary-grid">
      ${cards.map((item) => `
        <article class="list-card">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.value)}</span>
          <p>${escapeHtml(item.note)}</p>
        </article>
      `).join("")}
    </div>
    <div class="chips" style="margin-top:12px;">
      ${gradeRows.map((row) => `<span class="chip">grade ${escapeHtml(row.label || "-")} ${escapeHtml(String(row.count || 0))}건</span>`).join("")}
      ${classRows.map((row) => `<span class="chip">${escapeHtml(row.label || "-")} ${escapeHtml(String(row.count || 0))}건</span>`).join("")}
      ${bestSignal.name ? `<span class="chip buy">베스트 ${escapeHtml(bestSignal.name)}</span>` : ""}
      ${lateSignal.name ? `<span class="chip warn">아쉬운 신호 ${escapeHtml(lateSignal.name)}</span>` : ""}
    </div>
    <div class="analysis-list" style="margin-top:14px;">${previewHtml}</div>
  `;
}

function recommendationMetricLabel(metricKey) {
  const mapping = {
    false_positive_ratio: "false positive 비율",
    early_detection_count: "초기 후보 수",
    overextended_ratio: "과열 추격 비율",
    focused_to_signal_conversion_rate: "집중 감시 -> 신호 전환율",
    promotion_count: "집중 감시 승격 수",
    win_rate: "승률",
    avg_pnl_pct: "평균 수익률",
    candidate_to_signal_conversion_rate: "후보 -> 신호 전환율",
    preset: "검토 대상 preset",
    best_preset: "비교용 우수 preset",
  };
  return mapping[metricKey] || metricKey;
}

function sessionEventLabel(eventType) {
  const mapping = {
    candidate_detected: "초기 후보 생성",
    candidate_rejected: "과열 후보 제외",
    focused_promoted: "집중 감시 승격",
    focused_demoted: "집중 감시 강등",
    candidate_removed: "후보 종료",
    confirmed_buy_signal: "확정 매수 신호",
    confirmed_sell_signal: "확정 매도 신호",
    buy_signal_validation: "매수 신호 복기",
    sell_signal_validation: "매도 신호 복기",
    settings_change: "설정 변경",
    preset_change: "preset 변경",
    market_phase_change: "시장 상태 전환",
    source_mode_change: "반영 모드 전환",
    live_state_change: "live 상태 전환",
    runtime_error: "운영 오류",
    session_summary: "세션 요약 갱신",
  };
  return mapping[eventType] || eventType || "세션 이벤트";
}

function formatRecommendationMetric(metricKey, value) {
  if (value == null || value === "") return "-";
  if (typeof value === "string") return value;
  if (metricKey.endsWith("_count")) return `${Math.round(numberOrZero(value))}건`;
  if (metricKey.endsWith("_minutes")) return `${numberOrZero(value).toFixed(1)}분`;
  if (metricKey.includes("pnl_pct")) return formatPct(value);
  if (metricKey.includes("ratio") || metricKey.includes("rate")) return `${numberOrZero(value).toFixed(1)}%`;
  return numberOrZero(value).toFixed(2);
}

function applyRecommendationDraft(fieldKey, rawValue) {
  const field = fieldByKey(fieldKey);
  if (!field) {
    activateTab("settings");
    setSettingsFlash("info", "추천 내용을 확인했습니다. 설정 탭에서 직접 값을 조정한 뒤 저장해 주세요.");
    return;
  }

  const input = document.getElementById(field.inputId);
  if (!input) return;

  const nextValue = field.type === "bool"
    ? isTruthy(rawValue)
    : numberOrZero(rawValue);
  const currentRow = {
    ...defaultSettingsRow(),
    ...(state.settingsRow || {}),
  };
  state.settingsRow = {
    ...currentRow,
    [fieldKey]: nextValue,
    changed_source: "recommendation-draft",
    change_reason: "manual-recommendation-review",
  };

  if (field.type === "bool") input.checked = nextValue;
  else input.value = String(rawValue ?? "");

  activateTab("settings");
  renderSettingsV2();
  setSettingsFlash("info", `${field.label} 추천값을 입력값에 채웠습니다. 저장 버튼을 눌러야 실제 운영 기준에 반영됩니다.`);
}

function renderExperimentSummaryCards(experimentRows, experimentSupport) {
  const latest = experimentRows[0] || {};
  const latestSummary = parseMaybeJson(latest.summary, latest.summary || {});
  const cards = [
    {
      label: "최근 실험 winner",
      value: latestSummary.winner || experimentSupport.winner || "자료 부족",
      note: latestSummary.summary_line || experimentSupport.summary_line || "아직 replay 실험 결과가 충분히 쌓이지 않았습니다.",
    },
    {
      label: "실험 신뢰도",
      value: confidenceLabelText(latestSummary.confidence || experimentSupport.confidence || "very_low", latestSummary.confidence || experimentSupport.confidence || "참고 수준"),
      note: `표본 ${numberOrZero(latestSummary.sample_size || experimentSupport.sample_size).toFixed(0)}세션 / 신호 ${numberOrZero(latestSummary.trade_sample_size || experimentSupport.trade_sample_size).toFixed(0)}건`,
    },
    {
      label: "baseline vs candidate",
      value: `${latest.baseline_name || "-"} vs ${latest.candidate_name || "-"}`,
      note: `효과 차이 ${numberOrZero(latestSummary.effect_size).toFixed(2)} / 과최적화 경고 ${latestSummary.overfit_warning_level || latestSummary.overfit_warning || "낮음"}`,
    },
  ];
  return cards.map((item) => `
    <article class="list-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join("");
}

function renderExperimentReportList(experimentRows) {
  if (!experimentRows.length) {
    return '<div class="empty">아직 replay 기반 A/B 비교 결과가 없습니다. 장중 tape를 쌓은 뒤 experiment 모드로 비교하면 여기에 요약이 보입니다.</div>';
  }
  return `
    <div class="analysis-list">
      ${experimentRows.slice(0, 4).map((row) => {
        const summary = parseMaybeJson(row.summary, row.summary || {});
        const delta = parseMaybeJson(summary.delta_metrics, summary.delta_metrics || {});
        const warnings = safeArray(summary.warnings);
        return `
          <article class="analysis-card">
            <strong>${escapeHtml(`${row.baseline_name || "-"} vs ${row.candidate_name || "-"}`)}</strong>
            <span>${escapeHtml((row.session_scope || "scope") + (row.lookback_scope ? ` / ${row.lookback_scope}` : ""))}</span>
            <p>${escapeHtml(summary.summary_line || "같은 tape 위에서 baseline과 candidate를 순차 replay로 비교한 결과입니다.")}</p>
            <div class="chips">
              <span class="chip">winner ${escapeHtml(summary.winner || "inconclusive")}</span>
              <span class="chip">confidence ${escapeHtml(confidenceLabelText(summary.confidence || "very_low", summary.confidence || "참고 수준"))}</span>
              <span class="chip">표본 ${escapeHtml(numberOrZero(summary.sample_size).toFixed(0))}</span>
              <span class="chip">후보→신호 Δ ${escapeHtml(numberOrZero(delta.candidate_to_signal_conversion_rate).toFixed(1))}%</span>
              <span class="chip">평균 수익률 Δ ${escapeHtml(formatPct(delta.avg_pnl_pct || 0))}</span>
              <span class="chip">false positive Δ ${escapeHtml(numberOrZero(delta.false_positive_ratio).toFixed(1))}%</span>
            </div>
            ${warnings.length ? `<p class="small">${escapeHtml(warnings.join(" / "))}</p>` : ""}
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderSessionReview() {
  const sessionSummary = currentSessionSummary();
  const candidateSummary = sessionSummary.candidate_summary || {};
  const overall = sessionSummary.overall || {};
  const qualityValidation = sessionSummary.quality_validation || {};
  const eventSummary = safeArray(sessionSummary.session_event_summary);
  const recommendedAdjustments = safeArray(sessionSummary.recommended_adjustments)
    .map((row) => ({ ...row, metrics: parseMaybeJson(row.metrics, row.metrics || {}) }));
  const timelineRows = safeArray(sessionSummary.session_timeline).map((row) => normalizeRow(row));

  state.sessionEventRows = timelineRows;
  upsertDetailIndex(timelineRows);

  const reviewCards = [
    {
      label: "오늘 세션 요약",
      value: state.sessionReport?.session_date || "-",
      note: isTestPreset(sessionSummary.active_preset_name)
        ? "테스트용 넓게 포착 preset 기준으로 복기합니다. 후보와 focused 승격이 많이 잡히는지 먼저 보는 용도입니다."
        : `${sessionSummary.active_preset_label || sessionSummary.active_preset_name || "preset 확인 중"} 기준으로 자동 복기가 정리됩니다.`,
    },
    {
      label: "후보 -> 집중 감시",
      value: `${numberOrZero(candidateSummary.candidate_to_focused_conversion_rate).toFixed(1)}%`,
      note: `초기 후보 ${candidateSummary.early_detection_count ?? 0}건 중 ${candidateSummary.promotion_count ?? 0}건이 집중 감시로 올라갔습니다.`,
    },
    {
      label: "집중 감시 -> 확정 신호",
      value: `${numberOrZero(candidateSummary.focused_to_signal_conversion_rate).toFixed(1)}%`,
      note: `확정 신호까지 이어진 평균 시간은 ${numberOrZero(candidateSummary.avg_minutes_to_signal).toFixed(1)}분입니다.`,
    },
    {
      label: "거짓 후보 비율",
      value: `${numberOrZero(candidateSummary.false_positive_candidate_ratio).toFixed(1)}%`,
      note: `과열 추격 감점 후보 비율은 ${numberOrZero(candidateSummary.overextended_candidate_ratio).toFixed(1)}%입니다.`,
    },
    {
      label: "평균 수익률",
      value: formatPct(overall.avg_pnl_pct || 0),
      note: `종료 거래 ${overall.closed_count ?? 0}건 / 익절 ${overall.profit_take_count ?? 0}건 / 손절 ${overall.stop_loss_count ?? 0}건입니다.`,
    },
    {
      label: "평균 보유 시간",
      value: formatHolding(overall.avg_holding_seconds || 0),
      note: `추적손절 ${overall.trailing_stop_count ?? 0}건 / 모멘텀 약화 ${overall.momentum_loss_count ?? 0}건을 포함합니다.`,
    },
  ];

  el.historyReviewCards.innerHTML = reviewCards.map((item) => `
    <article class="list-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join("");

  el.historyRecommendationList.innerHTML = recommendedAdjustments.length
    ? recommendedAdjustments.map((item) => {
      const metricChips = Object.entries(item.metrics || {}).map(([metricKey, metricValue]) => `
        <span class="chip">${escapeHtml(recommendationMetricLabel(metricKey))} ${escapeHtml(formatRecommendationMetric(metricKey, metricValue))}</span>
      `).join("");
      const fillButton = item.field && item.field !== "preset_review"
        ? `<button class="secondary recommendation-action" type="button" data-recommend-field="${escapeHtml(item.field)}" data-recommend-value="${escapeHtml(String(item.recommended_value ?? ""))}">입력값에 채우기</button>`
        : `<button class="ghost recommendation-action" type="button" data-tab-target="settings">설정 탭에서 확인</button>`;
      return `
        <article class="recommendation-card">
          <div class="signal-head">
            <div>
              <h3>${escapeHtml(recommendationFieldLabel(item.field))}</h3>
              <div class="signal-meta">현재 ${escapeHtml(recommendationValueText(item.field, item.current_value))} -> 추천 ${escapeHtml(recommendationValueText(item.field, item.recommended_value))}</div>
            </div>
            <div class="button-row">
              ${fillButton}
            </div>
          </div>
          <p class="signal-summary">${escapeHtml(item.reason || "오늘 세션 결과를 바탕으로 다음 운영에서 검토해 볼 만한 조정 제안입니다.")}</p>
          <div class="signal-tags">${metricChips}</div>
        </article>
      `;
    }).join("")
    : '<div class="empty">오늘 세션 기준으로는 자동 조정 제안이 아직 없습니다. 지금 기준을 그대로 유지해도 괜찮습니다.</div>';

  el.historyRecommendationList.innerHTML = renderRecommendationCards(
    recommendedAdjustments,
    "?ㅻ뒛 ?몄뀡 湲곗??쇰줈???꾩쭅 ?먮룞 議곗젙 ?쒖븞???놁뒿?덈떎. 吏湲?湲곗???洹몃?濡??좎??대룄 愿쒖갖?듬땲??",
  );

  const qualityCards = [
    {
      label: "품질 상위군 전환율",
      value: `${numberOrZero(qualityValidation.top_quality_conversion_rate).toFixed(1)}%`,
      note: "후보 품질 상위 구간이 실제 확정 신호로 얼마나 이어졌는지 보여줍니다.",
    },
    {
      label: "품질 하위군 false positive",
      value: `${numberOrZero(qualityValidation.low_quality_false_positive_ratio).toFixed(1)}%`,
      note: "품질 점수가 낮았던 후보가 실제로 불필요한 후보였는지 확인합니다.",
    },
    {
      label: "이벤트 로그 수",
      value: String(eventSummary.reduce((sum, item) => sum + numberOrZero(item.count), 0)),
      note: "후보 생성, 승격, 신호, 설정 변경, 오류 등 세션 단위 이벤트가 저장된 건수입니다.",
    },
    {
      label: "검증 모드",
      value: sessionSummary.validation_mode_enabled ? "활성" : "기본 운영",
      note: sessionSummary.validation_mode_enabled
        ? "실시장 검증용 로그가 더 자세히 남고 있습니다."
        : "기본 운영 기준 로그만 남기고 있습니다.",
    },
  ];

  const qualityChips = [
    ...safeArray(qualityValidation.quality_vs_outcome).slice(0, 3).map((item) => `품질 ${item.label} ${item.count}건 / 성공률 ${numberOrZero(item.win_rate).toFixed(1)}%`),
    ...safeArray(qualityValidation.quality_vs_lead_time).slice(0, 2).map((item) => `품질 ${item.label} 평균 ${numberOrZero(item.avg_pnl_pct).toFixed(1)}분`),
    ...eventSummary.slice(0, 3).map((item) => `${sessionEventLabel(item.label)} ${item.count}건`),
  ];

  el.historyQualityCards.innerHTML = `
    <div class="history-summary-grid">
      ${qualityCards.map((item) => `
        <article class="list-card">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.value)}</span>
          <p>${escapeHtml(item.note)}</p>
        </article>
      `).join("")}
    </div>
    <div class="chips">${qualityChips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("")}</div>
  `;

  el.historyTimelineList.innerHTML = timelineRows.length
    ? timelineRows.map((row) => {
      const detail = detailFromRow(row);
      const timelineKey = row.event_id || row.signal_id || row.position_id || row.candidate_id || row.code;
      const tags = [
        row.preset_label || row.preset_name || "",
        row.candidate_type || "",
        row.signal_type || "",
        row.outcome_label || "",
      ].filter(Boolean).slice(0, 3);
      return `
        <article class="timeline-item">
          <div class="timeline-time">${escapeHtml(formatDateTime(row.event_time || row.created_at))}</div>
          <div class="timeline-body">
            <strong>${escapeHtml(sessionEventLabel(row.event_type))}</strong>
            <p>${escapeHtml(row.summary || detail.signal_summary || "세션 흐름을 복기할 수 있도록 이벤트가 저장되었습니다.")}</p>
            <div class="chips">
              <span class="chip">${escapeHtml(row.name || row.code || "시장 이벤트")}</span>
              ${tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}
              ${numberOrZero(row.candidate_quality_score) > 0 ? `<span class="chip">품질 ${escapeHtml(numberOrZero(row.candidate_quality_score).toFixed(1))}</span>` : ""}
              ${numberOrZero(row.signal_score) > 0 ? `<span class="chip">신호점수 ${escapeHtml(numberOrZero(row.signal_score).toFixed(1))}</span>` : ""}
            </div>
          </div>
          <div class="button-row">
            <button class="ghost" data-detail-id="${escapeHtml(timelineKey)}" type="button">자세히</button>
          </div>
        </article>
      `;
    }).join("")
    : '<div class="empty">세션 타임라인이 아직 없습니다. 장중 이벤트가 쌓이면 여기에서 하루 흐름을 시간순으로 복기할 수 있습니다.</div>';
}

function renderSettingsV2() {
  const { inputRow, activePreset, recommendedPreset, effective, inputSnapshot, selectedPresetSnapshot } = currentComparisonState();
  const autoEnabled = !!inputRow.auto_preset_enabled;

  el.selectedPresetName.innerHTML = state.presetRows
    .map((row) => `<option value="${escapeHtml(row.preset_name)}">${escapeHtml(row.label)}</option>`)
    .join("");
  el.selectedPresetName.value = inputRow.selected_preset_name || recommendedPreset.preset_name;
  syncSettingsInputs(inputRow);

  const effectiveDiffCount = SETTINGS_FIELDS.filter((field) => {
    const inputValue = inputSnapshot[field.key];
    const effectiveValue = effective[field.key];
    if (field.type === "bool") return Boolean(inputValue) !== Boolean(effectiveValue);
    return !approxEqual(inputValue, effectiveValue);
  }).length;

  el.settingsSummary.textContent = autoEnabled
    ? `자동 추천이 켜져 있어 현재는 ${activePreset.label} 기준이 우선 적용됩니다. 전체 탐지층과 집중 실시간 신호층의 값을 나눠서 비교할 수 있습니다.`
    : "수동 입력값을 기준으로 전체 탐지층과 실시간 신호층의 판단값을 직접 조절할 수 있습니다.";

  el.settingsMeta.innerHTML = [
    {
      label: "입력값 저장 시각",
      value: formatDateTime(inputRow.updated_at),
      note: `${changedSourceLabel(inputRow.changed_source)} / ${inputRow.change_reason || "최근 변경 사유 없음"}`,
    },
    {
      label: "추천 preset",
      value: recommendedPreset.label,
      note: recommendedPreset.reason || "현재 시간대에 맞는 추천 기준입니다.",
    },
    {
      label: "현재 적용값",
      value: activePreset.label,
      note: `${formatDateTime(state.status?.signal_settings_applied_at)} 기준으로 러너가 사용 중입니다.`,
    },
    {
      label: "입력값과 차이",
      value: effectiveDiffCount ? `${effectiveDiffCount}개 항목 조정됨` : "입력값과 동일",
      note: autoEnabled
        ? "자동 추천이 켜져 있으면 시간대에 따라 일부 값이 추천 preset 기준으로 덮어써질 수 있습니다."
        : "자동 추천이 꺼져 있어 저장한 값이 그대로 적용됩니다.",
    },
    {
      label: "탐지층 / 신호층",
      value: `스캔 ${formatThresholdValue("broad_scan_window_minutes", effective.broad_scan_window_minutes)} / 신호 ${formatThresholdValue("compare_window_minutes", effective.compare_window_minutes)}`,
      note: `후보 ${formatThresholdValue("candidate_threshold", effective.candidate_threshold)} / 신호점수 ${formatThresholdValue("min_signal_score", effective.min_signal_score)}`,
    },
  ].map((item) => `
    <article class="meta-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");

  el.settingsHelpList.innerHTML = SETTINGS_FIELDS.map((field) => `
    <article class="help-card">
      <span class="field-badge">${escapeHtml(sectionLabel(field.section))}</span>
      <strong>${escapeHtml(field.label)}</strong>
      <p>${escapeHtml(field.shortHelp)}</p>
      <p>${escapeHtml(field.detailHelp)}</p>
    </article>
  `).join("");

  el.presetRow.innerHTML = state.presetRows.map((preset) => {
    const active = preset.preset_name === (state.status?.active_preset_name || inputRow.active_preset_name);
    return `
      <article class="preset-card">
        <strong>${escapeHtml(preset.label)}</strong>
        <span>${active ? "현재 적용 중" : "추천값"}</span>
        <p>${escapeHtml(preset.description || "")}</p>
        <div class="chips">
          <span class="chip">스캔 ${escapeHtml(formatThresholdValue("broad_scan_window_minutes", preset.broad_scan_window_minutes))}</span>
          <span class="chip">후보 ${escapeHtml(formatThresholdValue("candidate_threshold", preset.candidate_threshold))}</span>
          <span class="chip">초기 RVOL ${escapeHtml(formatThresholdValue("early_rvol_threshold", preset.early_rvol_threshold))}</span>
          <span class="chip">비교 ${escapeHtml(formatThresholdValue("compare_window_minutes", preset.compare_window_minutes))}</span>
          <span class="chip">RVOL ${escapeHtml(formatThresholdValue("rvol_threshold", preset.rvol_threshold))}</span>
          <span class="chip">turnover ${escapeHtml(formatThresholdValue("turnover_ratio_threshold", preset.turnover_ratio_threshold))}</span>
          <span class="chip">신호점수 ${escapeHtml(formatThresholdValue("min_signal_score", preset.min_signal_score))}</span>
        </div>
        <p>고급 안전 하한 ${escapeHtml(formatThresholdValue("min_trade_value_eok", preset.min_trade_value_eok))}</p>
        <div class="button-row" style="margin-top:12px;">
          <button class="secondary" data-preset="${escapeHtml(preset.preset_name)}" type="button">추천값 적용</button>
        </div>
      </article>
    `;
  }).join("");

  el.settingsCompareIntro.textContent = autoEnabled
    ? "자동 추천이 켜져 있으면 시간대에 맞는 추천 preset 값이 현재 적용값에 우선 반영됩니다. 스캔 설정과 실시간 신호 설정이 함께 어떻게 바뀌는지 비교해 보세요."
    : "수동 입력값이 그대로 적용되며, 현재 적용값 칸에서 러너가 실제 사용 중인 기준을 확인할 수 있습니다.";

  el.settingsCompareBody.innerHTML = SETTINGS_FIELDS.map((field) => {
    const inputValue = inputSnapshot[field.key];
    const recommendedValue = selectedPresetSnapshot[field.key];
    const effectiveValue = effective[field.key];
    const changed = field.type === "bool" ? Boolean(inputValue) !== Boolean(effectiveValue) : !approxEqual(inputValue, effectiveValue);
    return `
      <tr>
        <td>
          <strong>${escapeHtml(field.label)}</strong>
          <small>${escapeHtml(sectionLabel(field.section))}</small>
        </td>
        <td><span class="comparison-value">${escapeHtml(formatThresholdValue(field.key, inputValue))}</span></td>
        <td><span class="comparison-value">${escapeHtml(formatThresholdValue(field.key, recommendedValue))}</span></td>
        <td>
          <span class="comparison-value">
            ${escapeHtml(formatThresholdValue(field.key, effectiveValue))}
            ${changed ? '<span class="override-mark">입력값과 다름</span>' : ""}
          </span>
        </td>
      </tr>
    `;
  }).join("");

  setSettingsFlash(state.saveState.type, state.saveState.text);
}

function renderEarlyDetection() {
  const liveCollections = currentLiveCollections();
  const earlyRows = [...liveCollections.earlyRows]
    .sort((a, b) =>
      numberOrZero(b.candidate_quality_score) - numberOrZero(a.candidate_quality_score)
      || numberOrZero(b.candidate_score) - numberOrZero(a.candidate_score));
  const focusedRows = [...liveCollections.focusedRows]
    .sort((a, b) =>
      numberOrZero(a.focus_rank || 999) - numberOrZero(b.focus_rank || 999)
      || numberOrZero(b.candidate_quality_score) - numberOrZero(a.candidate_quality_score));
  const candidateSummary = parseMaybeJson(state.sessionReport?.summary, {}).candidate_summary || {};

  upsertDetailIndex([...earlyRows, ...focusedRows]);

  el.earlySummaryCards.innerHTML = [
    {
      label: "초기 포착 후보",
      value: String(earlyRows.length),
      note: "전체 유니버스 탐지층에서 강도가 붙은 후보 수입니다.",
    },
    {
      label: "집중 감시 종목",
      value: String(focusedRows.length),
      note: "websocket 집중 감시 대상으로 승격된 종목 수입니다.",
    },
    {
      label: "후보→신호 전환",
      value: `${numberOrZero(candidateSummary.candidate_to_signal_conversion_rate).toFixed(1)}%`,
      note: `평균 ${numberOrZero(candidateSummary.avg_minutes_to_signal).toFixed(1)}분 안에 확정 신호로 이어졌습니다.`,
    },
    {
      label: "품질 상위군 전환",
      value: `${numberOrZero(candidateSummary.high_quality_conversion_rate).toFixed(1)}%`,
      note: `false positive ${candidateSummary.false_positive_candidate_count ?? 0}건 / 과열 추격 ${candidateSummary.overextended_candidate_count ?? 0}건`,
    },
  ].map((item) => `
    <article class="list-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join("");

  el.focusedSummaryChips.innerHTML = [
    `전체 유니버스 ${state.status?.total_universe_count ?? state.status?.watchlist_count ?? 0}종목`,
    `스캔 진행 ${state.status?.broad_scan_processed_count ?? 0}/${state.status?.total_universe_count ?? state.status?.watchlist_count ?? 0}`,
    `초기 포착 ${state.status?.early_detection_count ?? 0}건`,
    `확정 신호 ${state.status?.confirmed_signal_count ?? 0}건`,
    `false positive ${candidateSummary.false_positive_candidate_count ?? 0}건`,
    `과열 추격 ${numberOrZero(candidateSummary.overextended_candidate_ratio).toFixed(1)}%`,
  ].map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");
  el.focusedSummaryChips.innerHTML = [
    `?꾩껜 ?좊땲踰꾩뒪 ${state.status?.total_universe_count ?? state.status?.watchlist_count ?? 0}醫낅ぉ`,
    `?ㅼ틪 吏꾪뻾 ${state.status?.broad_scan_processed_count ?? 0}/${state.status?.total_universe_count ?? state.status?.watchlist_count ?? 0}`,
    `珥덇린 ?ъ갑 ${earlyRows.length}嫄?`,
    `?뺤젙 ?좏샇 ${liveCollections.buyRows.length + liveCollections.sellRows.length}嫄?`,
    `false positive ${candidateSummary.false_positive_candidate_count ?? 0}嫄?`,
    `怨쇱뿴 異붽꺽 ${numberOrZero(candidateSummary.overextended_candidate_ratio).toFixed(1)}%`,
  ].map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");

  if (!earlyRows.length) {
    el.earlyDetectionList.innerHTML = '<div class="empty">전체 유니버스 탐지층에서 아직 눈에 띄는 초기 포착 후보가 없습니다.</div>';
  } else {
    el.earlyDetectionList.innerHTML = earlyRows.map((row) => {
      const detail = detailFromRow(row);
      const key = row.candidate_id || row.code;
      return `
        <article class="signal-card">
          <div class="signal-head">
            <div>
              <h3>${escapeHtml(row.name)} <span class="muted">${escapeHtml(row.code)}</span></h3>
              <div class="signal-meta">${escapeHtml(row.market || "-")} / ${escapeHtml(row.sector || "섹터 확인 중")} / ${escapeHtml(row.detection_type || detail.signal_type || "-")}</div>
            </div>
            <div class="button-row">
              <span class="tag info">초기 포착</span>
              <button class="ghost" data-detail-id="${escapeHtml(key)}" type="button">자세히</button>
            </div>
          </div>
          <p class="signal-summary">${escapeHtml(row.summary || detail.signal_summary || "막 강도가 붙기 시작한 후보입니다.")}</p>
          <div class="signal-tags">
            <span class="tag">후보점수 ${numberOrZero(row.candidate_score).toFixed(1)}</span>
            <span class="tag buy">품질 ${numberOrZero(row.candidate_quality_score ?? detail.candidate_quality_score).toFixed(1)}</span>
            <span class="tag">${escapeHtml(row.quality_label_text || detail.quality_label_text || "품질 확인 중")}</span>
            <span class="tag">집중점수 ${numberOrZero(row.focus_score).toFixed(1)}</span>
            <span class="tag">RVOL ${numberOrZero(detail.rvol).toFixed(2)}</span>
            <span class="tag">1분 ${formatPct(detail.recent_change_1m_pct)}</span>
            <span class="tag">${numberOrZero(detail.compare_window_minutes).toFixed(0)}분 ${formatPct(detail.recent_change_pct)}</span>
            <span class="tag">turnover ${formatRatioPct(detail.turnover_ratio)}</span>
          </div>
          <div class="signal-tags">
            <span class="tag info">${escapeHtml((safeArray(detail.quality_good_reasons)[0]) || "거래 강도와 흐름이 살아나는지 먼저 보는 후보입니다.")}</span>
            ${safeArray(detail.quality_caution_reasons)[0]
              ? `<span class="tag warn">${escapeHtml(safeArray(detail.quality_caution_reasons)[0])}</span>`
              : ""}
            ${numberOrZero(detail.overextension_risk) >= 7
              ? `<span class="tag danger">과열 추격 주의 ${numberOrZero(detail.overextension_risk).toFixed(1)}</span>`
              : ""}
          </div>
        </article>
      `;
    }).join("");
  }

  if (!focusedRows.length) {
    el.focusedWatchList.innerHTML = '<div class="empty">집중 실시간 감시 대상으로 올라온 종목이 아직 없습니다.</div>';
  } else {
    el.focusedWatchList.innerHTML = focusedRows.map((row) => {
      const detail = detailFromRow(row);
      const key = row.candidate_id || row.code;
      return `
        <article class="signal-card">
          <div class="signal-head">
            <div>
              <h3>${escapeHtml(row.name)} <span class="muted">${escapeHtml(row.code)}</span></h3>
              <div class="signal-meta">집중 감시 ${numberOrZero(row.focus_rank).toFixed(0)}순위 / ${escapeHtml(row.market || "-")} / ${escapeHtml(row.sector || "섹터 확인 중")}</div>
            </div>
            <div class="button-row">
              <span class="tag buy">집중 감시</span>
              <button class="ghost" data-detail-id="${escapeHtml(key)}" type="button">자세히</button>
            </div>
          </div>
          <p class="signal-summary">${escapeHtml(row.summary || detail.signal_summary || "실시간 shard가 추적 중인 후보입니다.")}</p>
          <div class="signal-tags">
            <span class="tag">후보점수 ${numberOrZero(row.candidate_score).toFixed(1)}</span>
            <span class="tag buy">품질 ${numberOrZero(row.candidate_quality_score ?? detail.candidate_quality_score).toFixed(1)}</span>
            <span class="tag">${escapeHtml(row.quality_label_text || detail.quality_label_text || "품질 확인 중")}</span>
            <span class="tag">집중점수 ${numberOrZero(row.focus_score).toFixed(1)}</span>
            <span class="tag">현재가 ${formatPrice(row.price || detail.current_price || 0)}</span>
            <span class="tag">RVOL ${numberOrZero(detail.rvol).toFixed(2)}</span>
            <span class="tag">turnover ${formatRatioPct(detail.turnover_ratio)}</span>
            <span class="tag">승격 ${formatDateTime(row.promoted_at || detail.promoted_at)}</span>
          </div>
          <div class="signal-tags">
            <span class="tag info">${escapeHtml((safeArray(detail.quality_good_reasons)[0]) || "집중 감시 단계에서 후속 체결을 확인 중입니다.")}</span>
            ${safeArray(detail.quality_caution_reasons)[0]
              ? `<span class="tag warn">${escapeHtml(safeArray(detail.quality_caution_reasons)[0])}</span>`
              : ""}
            ${numberOrZero(detail.overextension_risk) >= 7
              ? `<span class="tag danger">과열 추격 주의 ${numberOrZero(detail.overextension_risk).toFixed(1)}</span>`
              : ""}
          </div>
        </article>
      `;
    }).join("");
  }
  if (el.mobileEarlySummaryChips && el.mobileEarlyDetectionList) {
    const previewRows = [];
    const seen = new Set();
    focusedRows.slice(0, 2).forEach((row) => {
      const key = row.candidate_id || row.code;
      if (seen.has(key)) return;
      seen.add(key);
      previewRows.push({ ...row, _mobile_kind: "focused" });
    });
    earlyRows.slice(0, 4).forEach((row) => {
      const key = row.candidate_id || row.code;
      if (seen.has(key) || previewRows.length >= 4) return;
      seen.add(key);
      previewRows.push({ ...row, _mobile_kind: "early" });
    });

    el.mobileEarlySummaryChips.innerHTML = [
      `초기 포착 ${state.status?.current_candidate_count ?? earlyRows.length}종목`,
      `집중 감시 ${state.status?.current_focused_watchlist_count ?? focusedRows.length}종목`,
      `확정 신호 ${state.status?.confirmed_signal_count ?? 0}건`,
    ].map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");

    el.mobileEarlyDetectionList.innerHTML = previewRows.length
      ? previewRows.map((row) => {
        const detail = detailFromRow(row);
        const key = row.candidate_id || row.code;
        const isFocused = row._mobile_kind === "focused";
        return `
          <article class="signal-card mobile-preview-card">
            <div class="signal-head">
              <div>
                <h3>${escapeHtml(row.name)} <span class="muted">${escapeHtml(row.code)}</span></h3>
                <div class="signal-meta">${escapeHtml(row.market || "-")} / ${escapeHtml(row.sector || "섹터 확인 중")} / ${escapeHtml(row.detection_type || detail.signal_type || "-")}</div>
              </div>
              <div class="button-row">
                <span class="tag ${isFocused ? "buy" : "info"}">${isFocused ? "집중 감시" : "초기 포착"}</span>
                <button class="ghost" data-detail-id="${escapeHtml(key)}" type="button">자세히</button>
              </div>
            </div>
            <div class="signal-tags">
              <span class="tag">등락 ${formatPct(detail.change_rate || row.change_rate || 0)}</span>
              <span class="tag">품질 ${numberOrZero(row.candidate_quality_score ?? detail.candidate_quality_score).toFixed(1)}</span>
              <span class="tag">RVOL ${numberOrZero(detail.rvol).toFixed(2)}</span>
              <span class="tag">turnover ${formatRatioPct(detail.turnover_ratio)}</span>
            </div>
            <p class="signal-summary">${escapeHtml((safeArray(detail.quality_good_reasons)[0]) || row.summary || "강도가 붙는 흐름을 우선 추적하는 후보입니다.")}</p>
            ${safeArray(detail.quality_caution_reasons)[0]
              ? `<div class="signal-tags"><span class="tag warn">${escapeHtml(safeArray(detail.quality_caution_reasons)[0])}</span></div>`
              : ""}
          </article>
        `;
      }).join("")
      : '<div class="empty">모바일 첫 화면에 보여줄 초기 포착 후보가 아직 없습니다.</div>';
  }
}

function renderOverview() {
  const rows = [...state.overviewRows].sort((a, b) =>
    numberOrZero(b.change_rate) - numberOrZero(a.change_rate)
    || numberOrZero(b.trade_value_eok) - numberOrZero(a.trade_value_eok)
    || numberOrZero(b.score) - numberOrZero(a.score)
  );
  upsertDetailIndex(rows);
  if (!rows.length) {
    el.overviewBoard.innerHTML = '<div class="empty">상승 종목 섹터 보드에 아직 표시할 데이터가 없습니다.</div>';
    return;
  }

  const grouped = rows.reduce((acc, row) => {
    const sector = row.sector || "섹터 확인 중";
    if (!acc[sector]) acc[sector] = [];
    acc[sector].push(row);
    return acc;
  }, {});

  el.overviewBoard.innerHTML = Object.entries(grouped).map(([sector, sectorRows]) => `
    <div style="margin-top:20px;">
      <div class="section-head">
        <h3>${escapeHtml(sector)}</h3>
        <span class="chip">${sectorRows.length}종목</span>
      </div>
      <div class="table-wrap">
        <table class="responsive-table responsive-table-market">
          <thead>
            <tr>
              <th>종목</th>
              <th>시장</th>
              <th>현재가</th>
              <th>등락률</th>
              <th>거래대금</th>
              <th>평가점수</th>
              <th>설명</th>
              <th>자세히</th>
            </tr>
          </thead>
          <tbody>
            ${sectorRows.map((row) => `
              <tr>
                <td data-label="종목"><strong>${escapeHtml(row.name)}</strong><small>${escapeHtml(row.code)}</small></td>
                <td data-label="시장">${escapeHtml(row.market || "-")}</td>
                <td data-label="현재가">${escapeHtml(formatPrice(row.price || 0))}</td>
                <td data-label="등락률">${escapeHtml(formatPct(row.change_rate || 0))}</td>
                <td data-label="거래대금">${escapeHtml(formatEok(row.trade_value_eok || 0))}</td>
                <td data-label="평가점수">${numberOrZero(row.score || 0).toFixed(1)}</td>
                <td><small>${escapeHtml(row.note || detailFromRow(row).signal_summary || "시장 흐름 관찰용 행입니다.")}</small></td>
                <td><button class="ghost" data-detail-id="${escapeHtml(row.signal_id || row.position_id || row.code)}" type="button">자세히</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `).join("");
}

function buildMarketFlowGroups(rows) {
  const grouped = rows.reduce((acc, row) => {
    const sector = String(row.sector || "섹터 확인 중").trim() || "섹터 확인 중";
    if (!acc[sector]) acc[sector] = [];
    acc[sector].push(row);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([sector, sectorRows]) => {
      const sortedRows = [...sectorRows].sort((a, b) =>
        numberOrZero(b.change_rate) - numberOrZero(a.change_rate)
        || numberOrZero(b.trade_value_eok) - numberOrZero(a.trade_value_eok)
        || numberOrZero(b.score) - numberOrZero(a.score)
      );
      const avgChange = sortedRows.length
        ? sortedRows.reduce((sum, row) => sum + numberOrZero(row.change_rate), 0) / sortedRows.length
        : 0;
      const totalTradeValue = sortedRows.reduce((sum, row) => sum + numberOrZero(row.trade_value_eok), 0);
      const representativeScore = sortedRows.length
        ? sortedRows.reduce((sum, row) => sum + numberOrZero(row.score), 0) / sortedRows.length
        : 0;
      return { sector, rows: sortedRows, avgChange, totalTradeValue, representativeScore };
    })
    .sort((a, b) => {
      const aUnknown = a.sector === "섹터 확인 중" ? 1 : 0;
      const bUnknown = b.sector === "섹터 확인 중" ? 1 : 0;
      return aUnknown - bUnknown
        || numberOrZero(b.avgChange) - numberOrZero(a.avgChange)
        || numberOrZero(b.totalTradeValue) - numberOrZero(a.totalTradeValue)
        || numberOrZero(b.representativeScore) - numberOrZero(a.representativeScore);
    });
}

function renderOverviewV2() {
  const rows = [...state.overviewRows].sort((a, b) =>
    numberOrZero(b.change_rate) - numberOrZero(a.change_rate)
    || numberOrZero(b.trade_value_eok) - numberOrZero(a.trade_value_eok)
    || numberOrZero(b.score) - numberOrZero(a.score)
  );
  upsertDetailIndex(rows);
  if (!rows.length) {
    el.overviewBoard.innerHTML = '<div class="empty">상승 종목 섹터 보드에 아직 표시할 데이터가 없습니다.</div>';
    return;
  }

  const groups = buildMarketFlowGroups(rows);
  el.overviewBoard.innerHTML = groups.map((group) => `
    <section class="market-sector-card">
      <div class="market-sector-head">
        <div>
          <h3>${escapeHtml(group.sector)}</h3>
          <p class="small">현재 실제로 상승 중인 종목을 섹터별로 묶어 시장 흐름만 빠르게 훑어보는 영역입니다.</p>
        </div>
        <div class="market-sector-stats">
          <span class="chip">${escapeHtml(`${group.rows.length}종목`)}</span>
          <span class="chip" data-signed-value="${escapeHtml(String(group.avgChange))}">평균 ${escapeHtml(formatPct(group.avgChange))}</span>
          <span class="chip">거래대금 ${escapeHtml(formatEok(group.totalTradeValue))}</span>
        </div>
      </div>
      <div class="market-flow-desktop">
        <div class="table-wrap market-flow-table-wrap">
          <table class="market-flow-grid-table">
            <thead>
              <tr>
                <th>종목명</th>
                <th>종목코드</th>
                <th>상승률</th>
                <th>현재가</th>
                <th>거래대금</th>
                <th>최근 변화</th>
                <th>평가점수</th>
                <th>상태</th>
                <th>자세히</th>
              </tr>
            </thead>
            <tbody>
              ${group.rows.map((row) => {
                const detail = detailFromRow(row);
                const detailKey = row.signal_id || row.position_id || row.code;
                const summary = row.note || detail.signal_summary || "시장 흐름 관찰용 행입니다.";
                return `
                  <tr>
                    <td class="market-flow-name-cell">
                      <strong>${escapeHtml(row.name)}</strong>
                      <small>${escapeHtml(row.market || "-")}</small>
                    </td>
                    <td class="market-flow-code-cell">${escapeHtml(row.code)}</td>
                    <td class="market-flow-number-cell" data-signed-value="${escapeHtml(String(numberOrZero(row.change_rate)))}">${escapeHtml(formatPct(row.change_rate || 0))}</td>
                    <td class="market-flow-number-cell" data-price-direction="${escapeHtml(String(numberOrZero(row.change_rate)))}">${escapeHtml(formatPrice(row.price || 0))}</td>
                    <td class="market-flow-number-cell">${escapeHtml(formatEok(row.trade_value_eok || 0))}</td>
                    <td class="market-flow-number-cell" data-signed-value="${escapeHtml(String(numberOrZero(detail.recent_change_pct)))}">${escapeHtml(formatPct(detail.recent_change_pct || 0))}</td>
                    <td class="market-flow-number-cell">${numberOrZero(row.score || 0).toFixed(1)}</td>
                    <td class="market-flow-status-cell"><small>${escapeHtml(summary)}</small></td>
                    <td class="market-flow-action-cell"><button class="ghost" data-detail-id="${escapeHtml(detailKey)}" type="button">자세히</button></td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="market-flow-mobile-list">
        ${group.rows.map((row) => {
          const detail = detailFromRow(row);
          const detailKey = row.signal_id || row.position_id || row.code;
          const summary = row.note || detail.signal_summary || "시장 흐름 관찰용 행입니다.";
          return `
            <article class="market-flow-mobile-row">
              <div class="market-flow-mobile-top">
                <div class="market-flow-mobile-title">
                  <strong>${escapeHtml(row.name)}</strong>
                  <small>${escapeHtml(row.code)} / ${escapeHtml(row.market || "-")}</small>
                </div>
                <button class="ghost market-flow-mobile-detail" data-detail-id="${escapeHtml(detailKey)}" type="button">자세히</button>
              </div>
              <div class="market-flow-mobile-metrics">
                <div class="market-flow-mobile-metric">
                  <span>상승률</span>
                  <strong data-signed-value="${escapeHtml(String(numberOrZero(row.change_rate)))}">${escapeHtml(formatPct(row.change_rate || 0))}</strong>
                </div>
                <div class="market-flow-mobile-metric">
                  <span>현재가</span>
                  <strong data-price-direction="${escapeHtml(String(numberOrZero(row.change_rate)))}">${escapeHtml(formatPrice(row.price || 0))}</strong>
                </div>
                <div class="market-flow-mobile-metric">
                  <span>거래대금</span>
                  <strong>${escapeHtml(formatEok(row.trade_value_eok || 0))}</strong>
                </div>
                <div class="market-flow-mobile-metric">
                  <span>최근 변화</span>
                  <strong data-signed-value="${escapeHtml(String(numberOrZero(detail.recent_change_pct)))}">${escapeHtml(formatPct(detail.recent_change_pct || 0))}</strong>
                </div>
                <div class="market-flow-mobile-metric">
                  <span>평가점수</span>
                  <strong>${numberOrZero(row.score || 0).toFixed(1)}</strong>
                </div>
                <div class="market-flow-mobile-metric">
                  <span>상태</span>
                  <strong>${escapeHtml(summary)}</strong>
                </div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
}

function decorateSignedMetrics() {
  document.querySelectorAll("[data-signed-value]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const value = numberOrZero(node.dataset.signedValue);
    node.classList.remove("positive", "negative", "neutral", "signed-value");
    node.classList.add("signed-value", signedTone(value));
  });

  document.querySelectorAll("[data-price-direction]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const value = numberOrZero(node.dataset.priceDirection);
    node.classList.remove("positive", "negative", "neutral", "signed-value", "subtle");
    node.classList.add("signed-value", signedTone(value), "subtle");
  });

  document.querySelectorAll(".signal-tags .tag, .detail-item strong, .responsive-table td, .list-card span, .status-item span, .meta-card span, .comparison-value").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.dataset.signedValue || node.dataset.priceDirection) return;
    const text = (node.textContent || "").trim();
    const pctMatch = text.match(/([-+]?\d+(?:\.\d+)?)%/);
    if (!pctMatch) return;
    const value = Number.parseFloat(pctMatch[1]);
    if (!Number.isFinite(value)) return;
    node.classList.remove("positive", "negative", "neutral", "signed-value");
    node.classList.add("signed-value", signedTone(value));
  });
}

function renderHistoryFilters(rows) {
  const signalValues = Array.from(new Set(rows.map((row) => row.buy_signal_type || row.sell_signal_type || "").filter(Boolean))).sort();
  const presetValues = Array.from(new Set(rows.map((row) => row.preset_label || row.preset_name || "").filter(Boolean))).sort();
  const sectorValues = Array.from(new Set(rows.map((row) => row.sector || "섹터 확인 중"))).sort();
  const dateValues = Array.from(new Set(rows.map(historyDateKey))).sort().reverse();

  el.historySort.innerHTML = [
    { value: "latest", label: "최신순" },
    { value: "pnl_desc", label: "수익률순" },
    { value: "holding_desc", label: "보유 시간순" },
    { value: "score_desc", label: "진입 점수순" },
  ].map((item) => `<option value="${item.value}">${item.label}</option>`).join("");

  el.historyStatusFilter.innerHTML = [
    { value: "ALL", label: "전체 상태" },
    { value: "OPEN", label: "진행중" },
    { value: "CLOSED", label: "종료" },
    { value: "익절", label: "익절" },
    { value: "손절", label: "손절" },
    { value: "시간종료", label: "시간종료" },
  ].map((item) => `<option value="${item.value}">${item.label}</option>`).join("");

  el.historySignalFilter.innerHTML = [`<option value="ALL">전체 신호</option>`, ...signalValues.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)].join("");
  el.historyPresetFilter.innerHTML = [`<option value="ALL">전체 preset</option>`, ...presetValues.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)].join("");
  el.historyDateFilter.innerHTML = [`<option value="ALL">전체 날짜</option>`, ...dateValues.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)].join("");
  el.historySectorFilter.innerHTML = [`<option value="ALL">전체 섹터</option>`, ...sectorValues.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)].join("");

  el.historySort.value = state.historySort;
  el.historyStatusFilter.value = state.historyStatusFilter;
  el.historySignalFilter.value = state.historySignalFilter;
  el.historyPresetFilter.value = state.historyPresetFilter;
  el.historyDateFilter.value = state.historyDateFilter;
  el.historySectorFilter.value = state.historySectorFilter;
  el.historySymbolQuery.value = state.historySymbolQuery;
}

function renderHistory() {
  renderHistoryFilters(state.historyRows);
  upsertDetailIndex(state.historyRows);
  const analytics = historyAnalyticsV2(state.historyRows);
  const rows = filteredHistoryRows();

  el.historySummaryCards.innerHTML = analytics.cards.map((item) => `
    <article class="list-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join("");
  el.historySummaryChips.innerHTML = analytics.chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");
  el.historyAdaptiveChips.innerHTML = analytics.summaries.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");
  renderSessionReview();

  el.historyTableBody.innerHTML = rows.length
    ? rows.map((row) => `
      <tr>
        <td>${escapeHtml(formatDateTime(row.entry_time || row.reference_time))}</td>
        <td><strong>${escapeHtml(row.name)}</strong><small>${escapeHtml(row.code)}</small></td>
        <td>${escapeHtml(row.market || "-")}</td>
        <td>${escapeHtml(row.sector || "섹터 확인 중")}</td>
        <td>${escapeHtml(row.buy_signal_type || row.sell_signal_type || "-")}</td>
        <td>${escapeHtml(formatPrice(row.entry_price || 0))}</td>
        <td>${escapeHtml(formatPrice(row.reference_price || row.current_price || 0))}</td>
        <td>${escapeHtml(formatPct(row.realized_pnl_pct ?? row.current_pnl_pct ?? 0))}</td>
        <td>${escapeHtml(row.holding_text || formatHolding(row.holding_seconds || 0))}</td>
        <td>${escapeHtml(row.preset_label || row.preset_name || "사용자 설정")}</td>
        <td>${escapeHtml(row.result_status || row.status || "-")}</td>
        <td><small>${escapeHtml(tableThresholdSummaryV2(row.thresholds_snapshot))}</small></td>
        <td><button class="ghost" data-detail-id="${escapeHtml(row.position_id)}" type="button">자세히</button></td>
      </tr>
    `).join("")
    : '<tr><td colspan="13" class="muted">조건에 맞는 내역이 아직 없습니다.</td></tr>';
}

function openDetail(key) {
  const row = state.detailIndex.get(key);
  if (!row) return;
  const detail = detailFromRow(row);
  const reasonLines = buildNarrativeReasonLines(detail, row);
  el.detailTitle.textContent = `${detail.name || detail.code} 상세`;
  el.detailSummary.textContent = detail.signal_summary || "신호 판단 근거를 쉽게 읽을 수 있도록 숫자와 설명 문장을 함께 정리했습니다.";

  const items = [
    ["종목명", detail.name || detail.code || "-"],
    ["시장", detail.market || "-"],
    ["섹터", detail.sector || "섹터 확인 중"],
    ["현재가", formatPrice(detail.current_price || 0)],
    ["시가", formatPrice(detail.open_price || 0)],
    ["고가", formatPrice(detail.high_price || 0)],
    ["저가", formatPrice(detail.low_price || 0)],
    ["등락률", formatPct(detail.change_rate || 0)],
    ["거래대금", formatEok(detail.trade_value_eok || 0)],
    ["신호 유형", detail.signal_type || "-"],
    ["신호점수", numberOrZero(detail.signal_score).toFixed(1)],
    ["RVOL", numberOrZero(detail.rvol).toFixed(2)],
    [`최근 ${detail.compare_window_minutes || 0}분 상승률`, formatPct(detail.recent_change_pct || 0)],
    ["자금 유입 비율", formatRatioPct(detail.turnover_ratio || 0)],
    ["고가권 위치", `${numberOrZero(detail.range_position_pct).toFixed(1)}%`],
    ["적용 preset", detail.active_preset_label || "사용자 설정"],
    ["최종 기준 점수", numberOrZero(detail.threshold_used).toFixed(1)],
    ["성과 보정", `${detail.threshold_adjustment >= 0 ? "+" : ""}${numberOrZero(detail.threshold_adjustment).toFixed(1)}`],
    ["섹터 가점", `${detail.sector_bonus >= 0 ? "+" : ""}${numberOrZero(detail.sector_bonus).toFixed(1)}`],
    ["설정 변경 출처", changedSourceLabel(detail.settings_changed_source)],
    ["설정 변경 사유", detail.settings_change_reason || "-"],
    ["설정 적용 시각", formatDateTime(detail.settings_applied_at || detail.settings_updated_at)],
    ["보유 시간", detail.holding_text || formatHolding(detail.holding_seconds || 0)],
    ["수익률", formatPct(detail.pnl_pct || 0)],
    ["결과 상태", detail.result_status || row.status || "-"],
  ];

  if (detail.follow_through_score != null && detail.follow_through_score !== "") {
    items.push(
      ["timing classification", detail.timing_classification || "-"],
      ["follow-through", numberOrZero(detail.follow_through_score).toFixed(1)],
      ["signal quality", detail.signal_quality_label || "-"],
      ["entry timing grade", detail.entry_timing_grade || "-"],
      ["exit timing grade", detail.exit_timing_grade || "-"],
      ["first move", `${numberOrZero(detail.signal_to_first_move_seconds).toFixed(0)}초`],
      ["best move", formatPct(detail.best_move_pct_after_signal || 0)],
      ["worst move", formatPct(detail.worst_move_pct_after_signal || 0)],
      ["MFE after signal", formatPct(detail.max_favorable_excursion_after_signal || 0)],
      ["MAE after signal", formatPct(-(detail.max_adverse_excursion_after_signal || 0))],
    );
  }

  el.detailGrid.innerHTML = items.map(([label, value]) => `
    <div class="detail-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");

  el.detailThresholds.innerHTML = Object.entries(detail.thresholds_snapshot || {})
    .map(([keyName, value]) => {
      const field = fieldByKey(keyName);
      const label = field ? field.label : keyName;
      return `<span class="chip">${escapeHtml(label)} ${escapeHtml(formatThresholdValue(keyName, value))}</span>`;
    })
    .join("");

  el.detailReasons.innerHTML = reasonLines.length
    ? reasonLines.map((line) => `<div class="reason-line">${escapeHtml(line)}</div>`).join("")
    : '<div class="reason-line">근거 문장이 아직 없습니다.</div>';
  el.detailModal.classList.add("open");
}

function openDetailV2(key) {
  const row = state.detailIndex.get(key);
  if (!row) return;
  const detail = detailFromRow(row);
  const reasonLines = buildNarrativeReasonLines(detail, row);
  el.detailTitle.textContent = `${detail.name || detail.code} 상세`;
  el.detailSummary.textContent = detail.signal_summary || "신호 판단 근거를 쉽게 읽을 수 있도록 숫자와 설명 문장을 함께 정리했습니다.";

  const items = [
    ["종목명", detail.name || detail.code || "-"],
    ["시장", detail.market || "-"],
    ["섹터", detail.sector || "섹터 확인 중"],
    ["현재가", formatPrice(detail.current_price || 0)],
    ["시가", formatPrice(detail.open_price || 0)],
    ["고가", formatPrice(detail.high_price || 0)],
    ["저가", formatPrice(detail.low_price || 0)],
    ["등락률", formatPct(detail.change_rate || 0)],
    ["거래대금", formatEok(detail.trade_value_eok || 0)],
    ["신호 유형", detail.signal_type || "-"],
    ["신호점수", numberOrZero(detail.signal_score).toFixed(1)],
    ["RVOL", numberOrZero(detail.rvol).toFixed(2)],
    [`최근 ${detail.compare_window_minutes || 0}분 상승률`, formatPct(detail.recent_change_pct || 0)],
    ["최근 1분 상승률", formatPct(detail.recent_change_1m_pct || 0)],
    ["최근 3분 상승률", formatPct(detail.recent_change_3m_pct || 0)],
    ["최근 5분 상승률", formatPct(detail.recent_change_5m_pct || 0)],
    ["turnover 비율", formatRatioPct(detail.turnover_ratio || 0)],
    ["최근 구간 turnover", formatRatioPct(detail.recent_turnover_ratio || 0)],
    ["RVOL 가속도", numberOrZero(detail.rvol_acceleration).toFixed(2)],
    ["turnover 가속도", formatRatioPct(detail.turnover_acceleration || 0)],
    ["고가권 위치", `${numberOrZero(detail.range_position_pct).toFixed(1)}%`],
    ["섹터 강도", numberOrZero(detail.sector_strength).toFixed(1)],
    ["tail risk", numberOrZero(detail.tail_risk).toFixed(2)],
    ["적용 preset", detail.active_preset_label || "사용자 설정"],
    ["최종 기준 점수", numberOrZero(detail.threshold_used).toFixed(1)],
    ["성과 보정", `${detail.threshold_adjustment >= 0 ? "+" : ""}${numberOrZero(detail.threshold_adjustment).toFixed(1)}`],
    ["섹터 가산", `${detail.sector_bonus >= 0 ? "+" : ""}${numberOrZero(detail.sector_bonus).toFixed(1)}`],
    ["후보 상태", detail.candidate_state || "-"],
    ["후보 품질 점수", numberOrZero(detail.candidate_quality_score).toFixed(1)],
    ["품질 라벨", detail.quality_label_text || detail.quality_label || "-"],
    ["과열 리스크", numberOrZero(detail.overextension_risk).toFixed(2)],
    ["과열 감점", `-${numberOrZero(detail.overextension_penalty).toFixed(2)}`],
    ["꼬리 리스크 감점", `-${numberOrZero(detail.tail_risk_penalty).toFixed(2)}`],
    ["최근 실패 이력 감점", `-${numberOrZero(detail.recent_failure_penalty).toFixed(2)}`],
    ["승격 우선순위", numberOrZero(detail.promotion_score).toFixed(1)],
    ["후보 결과 라벨", detail.outcome_label || "-"],
    ["집중 감시 순위", numberOrZero(detail.focus_rank) > 0 ? `${numberOrZero(detail.focus_rank).toFixed(0)}위` : "-"],
    ["후보 승격 시각", formatDateTime(detail.promoted_at)],
    ["설정 변경 출처", changedSourceLabel(detail.settings_changed_source)],
    ["설정 변경 사유", detail.settings_change_reason || "-"],
    ["설정 적용 시각", formatDateTime(detail.settings_applied_at || detail.settings_updated_at)],
    ["보유 시간", detail.holding_text || formatHolding(detail.holding_seconds || 0)],
    ["수익률", formatPct(detail.pnl_pct || 0)],
    ["결과 상태", detail.result_status || row.status || "-"],
  ];

  el.detailGrid.innerHTML = items.map(([label, value]) => `
    <div class="detail-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");

  el.detailThresholds.innerHTML = Object.entries(detail.thresholds_snapshot || {})
    .map(([keyName, value]) => {
      const field = fieldByKey(keyName);
      const label = field ? field.label : keyName;
      return `<span class="chip">${escapeHtml(label)} ${escapeHtml(formatThresholdValue(keyName, value))}</span>`;
    })
    .join("");

  el.detailReasons.innerHTML = reasonLines.length
    ? reasonLines.map((line) => `<div class="reason-line">${escapeHtml(line)}</div>`).join("")
    : '<div class="reason-line">근거 문장이 아직 없습니다.</div>';
  el.detailModal.classList.add("open");
}

function render() {
  renderStatus();
  syncMobileOperationalPanels();
  renderSettingsV2();
  const liveCollections = currentLiveCollections();
  const liveMode = liveCollections.effectiveMode === "live" || liveCollections.effectiveMode === "partial_live";
  renderSignalList(el.buySignalList, liveMode ? liveCollections.buyRows : [], "BUY");
  renderSignalList(el.sellSignalList, liveMode ? liveCollections.sellRows : [], "SELL");
  el.buySignalCount.textContent = `${state.buySignals.length}건`;
  el.sellSignalCount.textContent = `${state.sellSignals.length}건`;
  el.buySignalCount.textContent = `${liveCollections.buyRows.length}건`;
  el.sellSignalCount.textContent = `${liveCollections.sellRows.length}건`;
  renderMobilePrioritySummary();
  renderOverviewV2();
  renderEarlyDetection();
  renderHistory();
  decorateResponsiveTables();
  decorateSignedMetrics();
}

const closeDetail = () => el.detailModal.classList.remove("open");

function collectSettingsRow({
  changedSource = "public-ui",
  changeReason = "manual-save",
  note = "공개 페이지에서 기준을 조정했습니다.",
  autoEnabled = el.autoPresetEnabled.checked,
} = {}) {
  const preset = presetByName(el.selectedPresetName.value) || fallbackPreset();
  return {
    settings_key: state.config.appStatusKey,
    selected_preset_name: el.selectedPresetName.value || "",
    selected_preset_label: preset?.label || "",
    active_preset_name: preset?.preset_name || "",
    active_preset_label: preset?.label || "",
    active_preset_reason: preset?.reason || "",
    auto_preset_enabled: autoEnabled,
    broad_scan_window_minutes: Math.max(1, Math.round(numberOrZero(el.broadScanWindowMinutes.value || 1))),
    candidate_threshold: numberOrZero(el.candidateThreshold.value),
    early_surge_threshold: numberOrZero(el.earlySurgeThreshold.value),
    early_rvol_threshold: numberOrZero(el.earlyRvolThreshold.value),
    early_turnover_threshold: numberOrZero(el.earlyTurnoverThreshold.value),
    sector_leader_sensitivity: numberOrZero(el.sectorLeaderSensitivity.value),
    candidate_quality_threshold: numberOrZero(el.candidateQualityThreshold.value),
    focused_promotion_threshold: numberOrZero(el.focusedPromotionThreshold.value),
    candidate_expiry_minutes: Math.max(1, Math.round(numberOrZero(el.candidateExpiryMinutes.value || 1))),
    overextension_penalty_strength: numberOrZero(el.overextensionPenaltyStrength.value),
    tail_risk_penalty_strength: numberOrZero(el.tailRiskPenaltyStrength.value),
    recent_failure_penalty_strength: numberOrZero(el.recentFailurePenaltyStrength.value),
    surge_pct_threshold: numberOrZero(el.surgePctThreshold.value),
    compare_window_minutes: Math.max(1, Math.round(numberOrZero(el.compareWindowMinutes.value || 1))),
    min_trade_value_eok: numberOrZero(el.minTradeValueEok.value),
    min_signal_score: numberOrZero(el.minSignalScore.value),
    confirmed_breakout_sensitivity: numberOrZero(el.confirmedBreakoutSensitivity.value),
    confirmed_momentum_sensitivity: numberOrZero(el.confirmedMomentumSensitivity.value),
    trailing_stop_pct: numberOrZero(el.trailingStopPct.value),
    take_profit_pct: numberOrZero(el.takeProfitPct.value),
    stop_loss_pct: numberOrZero(el.stopLossPct.value),
    rvol_threshold: numberOrZero(el.rvolThreshold.value),
    turnover_ratio_threshold: numberOrZero(el.turnoverRatioThreshold.value),
    sector_strength_bonus_enabled: el.sectorStrengthBonusEnabled.checked,
    adaptive_tuning_enabled: el.adaptiveTuningEnabled.checked,
    changed_source: changedSource,
    change_reason: changeReason,
    source_mode: autoEnabled ? "auto" : "manual",
    note,
    updated_at: normalizedNowIso(),
  };
}

async function waitForRunnerReflection(savedRow, attempts = 10) {
  const expectedUpdatedAt = new Date(savedRow.updated_at || 0).getTime();
  for (let index = 0; index < attempts; index += 1) {
    await fetchStatus();
    const status = state.status || {};
    const reflectedAt = new Date(status.signal_settings_updated_at || 0).getTime();
    const selectedMatches = !savedRow.selected_preset_name || (status.selected_preset_name || "") === savedRow.selected_preset_name;
    if (reflectedAt && reflectedAt >= expectedUpdatedAt - 1000 && selectedMatches) return { reflected: true, status };
    await sleep(1200);
  }
  return { reflected: false, status: state.status || null };
}

async function saveSettingsRow(row, successMessage = "설정을 저장했습니다.") {
  setSettingsFlash("info", "설정을 저장하고 러너 반영 여부를 확인하는 중입니다.");
  el.saveSettingsButton.disabled = true;
  el.enableAutoButton.disabled = true;
  try {
    const { error } = await state.client.from(tableName("signalSettings")).upsert(row, { onConflict: "settings_key" });
    if (error) throw error;
    state.settingsRow = normalizeSettingsRow(row);
    state.settingsFetchState = {
      status: "saving-pending",
      note: "저장은 완료됐고, 러너 반영 여부를 다시 확인하는 중입니다.",
      bootstrapDefaultUsed: false,
    };
    renderSettingsV2();
    await fetchSettings().catch(() => null);
    const reflection = await waitForRunnerReflection(row).catch(() => ({ reflected: false, status: state.status || null }));
    await Promise.all([fetchSettings().catch(() => null), fetchStatus().catch(() => null), fetchDiagnostics().catch(() => null)]);
    render();
    if (reflection.reflected) {
      setSettingsFlash("success", `${successMessage} 러너가 ${formatDateTime(reflection.status?.signal_settings_applied_at || reflection.status?.signal_settings_updated_at)} 기준으로 반영했습니다. 현재 preset은 ${reflection.status?.active_preset_label || row.selected_preset_label || "사용자 설정"}입니다.`);
    } else {
      setSettingsFlash("warning", `${successMessage} 저장은 완료됐습니다. 다만 러너가 새 기준을 다시 읽는 데 몇 초 정도 더 걸릴 수 있습니다.`);
    }
  } finally {
    el.saveSettingsButton.disabled = false;
    el.enableAutoButton.disabled = false;
  }
}

async function applyPreset(presetName, autoEnabled = false) {
  const preset = presetByName(presetName);
  if (!preset) return;
  const row = {
    ...collectSettingsRow({
      changedSource: "public-ui",
      changeReason: autoEnabled ? "auto-preset" : `preset-apply:${preset.preset_name}`,
      note: autoEnabled ? `자동 추천을 켜고 ${preset.label} 기준을 사용합니다.` : `${preset.label} 추천값을 기준으로 입력값을 맞췄습니다.`,
      autoEnabled,
    }),
    selected_preset_name: preset.preset_name,
    selected_preset_label: preset.label,
    active_preset_name: preset.preset_name,
    active_preset_label: preset.label,
    active_preset_reason: preset.reason || "",
    broad_scan_window_minutes: numberOrZero(preset.broad_scan_window_minutes),
    candidate_threshold: numberOrZero(preset.candidate_threshold),
    early_surge_threshold: numberOrZero(preset.early_surge_threshold),
    early_rvol_threshold: numberOrZero(preset.early_rvol_threshold),
    early_turnover_threshold: numberOrZero(preset.early_turnover_threshold),
    sector_leader_sensitivity: numberOrZero(preset.sector_leader_sensitivity),
    candidate_quality_threshold: numberOrZero(preset.candidate_quality_threshold),
    focused_promotion_threshold: numberOrZero(preset.focused_promotion_threshold),
    candidate_expiry_minutes: Math.max(1, Math.round(numberOrZero(preset.candidate_expiry_minutes || 1))),
    overextension_penalty_strength: numberOrZero(preset.overextension_penalty_strength),
    tail_risk_penalty_strength: numberOrZero(preset.tail_risk_penalty_strength),
    recent_failure_penalty_strength: numberOrZero(preset.recent_failure_penalty_strength),
    surge_pct_threshold: numberOrZero(preset.surge_pct_threshold),
    compare_window_minutes: Math.max(1, Math.round(numberOrZero(preset.compare_window_minutes || 1))),
    min_trade_value_eok: numberOrZero(preset.min_trade_value_eok),
    min_signal_score: numberOrZero(preset.min_signal_score),
    confirmed_breakout_sensitivity: numberOrZero(preset.confirmed_breakout_sensitivity),
    confirmed_momentum_sensitivity: numberOrZero(preset.confirmed_momentum_sensitivity),
    trailing_stop_pct: numberOrZero(preset.trailing_stop_pct),
    take_profit_pct: numberOrZero(preset.take_profit_pct),
    stop_loss_pct: numberOrZero(preset.stop_loss_pct),
    rvol_threshold: numberOrZero(preset.rvol_threshold),
    turnover_ratio_threshold: numberOrZero(preset.turnover_ratio_threshold),
    sector_strength_bonus_enabled: isTruthy(preset.sector_strength_bonus_enabled),
    adaptive_tuning_enabled: isTruthy(preset.adaptive_tuning_enabled),
  };
  await saveSettingsRow(row, `${preset.label} 추천값을 저장했습니다.`);
}

function regimeTone(regimeKey) {
  const key = String(regimeKey || "").trim();
  if (["opening_gap_momentum", "broad_risk_on", "late_trend_day"].includes(key)) return "buy";
  if (["sector_rotation", "narrow_leadership", "weak_rebound"].includes(key)) return "ok";
  if (["choppy_whipsaw", "risk_off_fade"].includes(key)) return "warn";
  return "info";
}

function presetLabelByName(name) {
  const preset = presetByName(name);
  return preset?.label || String(name || "");
}

function applyPresetDraft(presetName) {
  const preset = presetByName(presetName);
  if (!preset) {
    activateTab("settings");
    setSettingsFlash("info", "추천 preset 정보를 찾지 못했습니다. 설정 탭에서 직접 기준을 확인해 주세요.");
    return;
  }
  const currentRow = {
    ...defaultSettingsRow(),
    ...(state.settingsRow || {}),
  };
  state.settingsRow = normalizeSettingsRow({
    ...currentRow,
    selected_preset_name: preset.preset_name,
    selected_preset_label: preset.label,
    active_preset_name: preset.preset_name,
    active_preset_label: preset.label,
    active_preset_reason: preset.reason || "",
    broad_scan_window_minutes: numberOrZero(preset.broad_scan_window_minutes),
    candidate_threshold: numberOrZero(preset.candidate_threshold),
    early_surge_threshold: numberOrZero(preset.early_surge_threshold),
    early_rvol_threshold: numberOrZero(preset.early_rvol_threshold),
    early_turnover_threshold: numberOrZero(preset.early_turnover_threshold),
    sector_leader_sensitivity: numberOrZero(preset.sector_leader_sensitivity),
    candidate_quality_threshold: numberOrZero(preset.candidate_quality_threshold),
    focused_promotion_threshold: numberOrZero(preset.focused_promotion_threshold),
    candidate_expiry_minutes: Math.max(1, Math.round(numberOrZero(preset.candidate_expiry_minutes || 1))),
    overextension_penalty_strength: numberOrZero(preset.overextension_penalty_strength),
    tail_risk_penalty_strength: numberOrZero(preset.tail_risk_penalty_strength),
    recent_failure_penalty_strength: numberOrZero(preset.recent_failure_penalty_strength),
    surge_pct_threshold: numberOrZero(preset.surge_pct_threshold),
    compare_window_minutes: Math.max(1, Math.round(numberOrZero(preset.compare_window_minutes || 1))),
    min_trade_value_eok: numberOrZero(preset.min_trade_value_eok),
    min_signal_score: numberOrZero(preset.min_signal_score),
    confirmed_breakout_sensitivity: numberOrZero(preset.confirmed_breakout_sensitivity),
    confirmed_momentum_sensitivity: numberOrZero(preset.confirmed_momentum_sensitivity),
    trailing_stop_pct: numberOrZero(preset.trailing_stop_pct),
    take_profit_pct: numberOrZero(preset.take_profit_pct),
    stop_loss_pct: numberOrZero(preset.stop_loss_pct),
    rvol_threshold: numberOrZero(preset.rvol_threshold),
    turnover_ratio_threshold: numberOrZero(preset.turnover_ratio_threshold),
    sector_strength_bonus_enabled: isTruthy(preset.sector_strength_bonus_enabled),
    adaptive_tuning_enabled: isTruthy(preset.adaptive_tuning_enabled),
    changed_source: "recommendation-draft",
    change_reason: `preset-review:${preset.preset_name}`,
    note: `${preset.label} 추천 preset을 입력값 초안으로 채웠습니다. 저장 전에는 실제 적용되지 않습니다.`,
    updated_at: normalizedNowIso(),
  });
  activateTab("settings");
  renderSettingsV2();
  setSettingsFlash("info", `${preset.label} 추천 preset을 입력값에 채웠습니다. 저장 버튼을 눌러야 실제 기준에 반영됩니다.`);
}

function recommendationFieldLabel(fieldKey) {
  if (fieldKey === "preset_review") return "추천 preset 검토";
  return fieldByKey(fieldKey)?.label || fieldKey || "조정 항목";
}

function recommendationValueText(fieldKey, value) {
  if (fieldKey === "preset_review") return presetLabelByName(value) || String(value || "-");
  return formatThresholdValue(fieldKey, value);
}

function recommendationMetricLabel(metricKey) {
  const mapping = {
    false_positive_ratio: "false positive 비율",
    early_detection_count: "초기 후보 수",
    overextended_ratio: "과열 추격 비율",
    focused_to_signal_conversion_rate: "집중 감시 -> 신호 전환율",
    promotion_count: "집중 감시 승격 수",
    win_rate: "승률",
    avg_pnl_pct: "평균 수익률",
    candidate_to_signal_conversion_rate: "후보 -> 신호 전환율",
    preset: "검토 대상 preset",
    best_preset: "비교 기준 preset",
    market_regime: "장세",
    regime_confidence: "장세 신뢰도",
    regime_reason: "장세 판단 이유",
    similar_session: "유사 장세 날짜",
    suggested_preset: "추천 preset",
  };
  return mapping[metricKey] || metricKey;
}

function sessionEventLabel(eventType) {
  const mapping = {
    candidate_detected: "초기 후보 생성",
    candidate_rejected: "과열 후보 제외",
    focused_promoted: "집중 감시 승격",
    focused_demoted: "집중 감시 강등",
    candidate_removed: "후보 종료",
    confirmed_buy_signal: "확정 매수 신호",
    confirmed_sell_signal: "확정 매도 신호",
    buy_signal_validation: "매수 신호 복기",
    sell_signal_validation: "매도 신호 복기",
    settings_change: "설정 변경",
    preset_change: "preset 변경",
    market_phase_change: "시장 상태 전환",
    market_regime_change: "장세 해석 갱신",
    source_mode_change: "반영 모드 전환",
    live_state_change: "live 상태 전환",
    runtime_error: "운영 오류",
    session_summary: "세션 요약 갱신",
  };
  return mapping[eventType] || eventType || "세션 이벤트";
}

function renderStatus() {
  const status = state.status || {};
  const sourceInfo = effectiveSourceModeStatus(status);
  const heartbeatInfo = heartbeatStatus(status);
  const settingsInfo = settingsReflectionStatus(status);
  const diagnosticsInfo = diagnosticsStatus(status);
  const liveFreshness = numberOrZero(status.live_data_freshness_seconds);
  const regimeLabel = status.current_market_regime_label || status.current_market_regime || "확인 중";
  const activePresetIsTest = isTestPreset(status.active_preset_name || status.selected_preset_name);
  const liveCollections = currentLiveCollections();

  el.marketStatusLabel.textContent = status.market_phase_label || status.market_status_label || "확인 중";
  el.sourceModeLabel.textContent = sourceInfo.label;
  el.activePresetLabel.textContent = status.active_preset_label || status.selected_preset_label || "확인 중";
  el.settingsAppliedLabel.textContent = settingsInfo.label;
  el.heartbeatLabel.textContent = heartbeatInfo.label;
  el.lastSignalLabel.textContent = formatDateTime(status.last_signal_at);
  el.statusNotice.textContent = sourceInfo.note || status.notice_text;
  const hasQuietMobileNotice = !(
    diagnosticsInfo.tone === "error"
    || diagnosticsInfo.tone === "warn"
    || sourceInfo.tone === "warn"
    || sourceInfo.tone === "pending"
    || status.ready_check_status === "fail"
    || status.ready_check_status === "warn"
    || Boolean(status.last_error_code || status.last_error_message)
  );
  el.statusNotice.classList.toggle("is-quiet", hasQuietMobileNotice);

  const chips = [
    { text: `전체 ${status.total_universe_count || status.watchlist_count || 0}종목`, tone: "info" },
    { text: `후보 ${status.current_candidate_count || 0}종목`, tone: "pending" },
    { text: `집중 감시 ${status.current_focused_watchlist_count || status.live_watchlist_count || 0}종목`, tone: "info" },
    { text: `live tick ${status.live_tick_count || 0}`, tone: "info" },
    { text: `freshness ${liveFreshness}초`, tone: sourceInfo.tone },
    { text: `장세 ${regimeLabel}`, tone: regimeTone(status.current_market_regime) },
    { text: `매수 ${status.buy_signal_count || 0}건`, tone: "buy" },
    { text: `매도 ${status.sell_signal_count || 0}건`, tone: "sell" },
    { text: `ready ${status.ready_check_status || "pending"}`, tone: status.ready_check_status === "fail" ? "error" : status.ready_check_status === "warn" ? "warn" : "info" },
    { text: `tape ${status.recorded_tape_row_count || 0}`, tone: status.tape_recording_enabled ? "info" : "warn" },
    { text: diagnosticsInfo.label, tone: diagnosticsInfo.tone },
  ];
  el.statusChips.innerHTML = chips.map((item) => `<span class="chip ${escapeHtml(item.tone)}">${escapeHtml(item.text)}</span>`).join("");
  const syncedChips = [
    { text: `?꾩껜 ${status.total_universe_count || status.watchlist_count || 0}醫낅ぉ`, tone: "info" },
    { text: `?꾨낫 ${liveCollections.earlyRows.length}醫낅ぉ`, tone: "pending" },
    { text: `吏묒쨷 媛먯떆 ${liveCollections.focusedRows.length}醫낅ぉ`, tone: "info" },
    { text: `live tick ${status.live_tick_count || 0}`, tone: "info" },
    { text: `freshness ${liveFreshness}珥?`, tone: sourceInfo.tone },
    { text: `?μ꽭 ${regimeLabel}`, tone: regimeTone(status.current_market_regime) },
    { text: `留ㅼ닔 ${liveCollections.buyRows.length}嫄?`, tone: "buy" },
    { text: `留ㅻ룄 ${liveCollections.sellRows.length}嫄?`, tone: "sell" },
    { text: `ready ${status.ready_check_status || "pending"}`, tone: status.ready_check_status === "fail" ? "error" : status.ready_check_status === "warn" ? "warn" : "info" },
    { text: `tape ${status.recorded_tape_row_count || 0}`, tone: status.tape_recording_enabled ? "info" : "warn" },
    { text: diagnosticsInfo.label, tone: diagnosticsInfo.tone },
  ];
  el.statusChips.innerHTML = syncedChips.map((item) => `<span class="chip ${escapeHtml(item.tone)}">${escapeHtml(item.text)}</span>`).join("");
  if (el.mobileStatusFlags) {
    const mobileFlags = [];
    if (diagnosticsInfo.tone === "error" || diagnosticsInfo.tone === "warn") {
      mobileFlags.push({ text: diagnosticsInfo.label, tone: diagnosticsInfo.tone });
    }
    if (status.ready_check_status === "fail" || status.ready_check_status === "warn") {
      mobileFlags.push({
        text: `ready ${status.ready_check_status}`,
        tone: status.ready_check_status === "fail" ? "error" : "warn",
      });
    }
    if (status.last_error_code || status.last_error_message) {
      mobileFlags.push({ text: "오류 있음", tone: "error" });
    }
    if (status.tape_recording_enabled === false) {
      mobileFlags.push({ text: "tape 湲곕줉 ?앹꽦", tone: "warn" });
    }
    el.mobileStatusFlags.innerHTML = mobileFlags
      .slice(0, 3)
      .map((item) => `<span class="chip ${escapeHtml(item.tone)}">${escapeHtml(item.text)}</span>`)
      .join("");
    el.mobileStatusFlags.hidden = mobileFlags.length === 0;
  }
  if (el.mobileStatusDetailBadge) {
    const hasStatusIssue = diagnosticsInfo.tone === "error"
      || diagnosticsInfo.tone === "warn"
      || status.ready_check_status === "warn"
      || status.ready_check_status === "fail"
      || Boolean(status.last_error_code || status.last_error_message);
    const badgeTone = diagnosticsInfo.tone === "error"
      ? "error"
      : diagnosticsInfo.tone === "warn" || status.ready_check_status === "warn"
        ? "warn"
        : "info";
    const badgeText = diagnosticsInfo.tone === "error"
      ? "오류"
      : diagnosticsInfo.tone === "warn" || status.ready_check_status === "warn"
        ? "경고"
        : "정상";
    el.mobileStatusDetailBadge.className = `chip ${badgeTone}`;
    el.mobileStatusDetailBadge.textContent = badgeText;
    el.mobileStatusDetailBadge.hidden = !hasStatusIssue;
  }

  const detailCards = [
    {
      label: "현재 적용 중인 기준",
      value: status.active_preset_label || "확인 중",
      note: activePresetIsTest
        ? "테스트용 preset 사용 중입니다. 후보와 focused 승격이 넓게 잡혀 false positive가 늘 수 있습니다."
        : status.active_preset_reason || "현재 시간대와 설정에 맞는 기준을 적용하고 있습니다.",
    },
    {
      label: "오늘의 장세",
      value: regimeLabel,
      note: status.regime_summary || "장세를 해석하는 중입니다.",
    },
    {
      label: "실시간 freshness",
      value: `${status.live_state || "stopped"} / ${liveFreshness}초`,
      note: `마지막 live tick ${formatDateTime(status.live_last_tick_at)}`,
    },
    {
      label: "설정 반영 상태",
      value: settingsInfo.label,
      note: settingsInfo.note,
    },
    {
      label: "최근 설정 변경",
      value: changedSourceLabel(status.settings_changed_source || state.settingsRow?.changed_source),
      note: status.settings_change_reason || state.settingsRow?.change_reason || "최근 변경 사유를 아직 받지 못했습니다.",
    },
    {
      label: "마지막 신호",
      value: formatDateTime(status.last_signal_at),
      note: `매수 ${formatDateTime(status.last_buy_signal_at)} / 매도 ${formatDateTime(status.last_sell_signal_at)}`,
    },
    {
      label: "장세 추천 preset",
      value: status.regime_matched_preset_label || "없음",
      note: status.regime_matched_preset_reason || "장세별 추천 preset을 정리하는 중입니다.",
    },
    {
      label: "ready check",
      value: status.ready_check_status || "pending",
      note: (status.ready_check_summary && status.ready_check_summary.summary_line) || "장 시작 전 준비 상태를 점검합니다.",
    },
    {
      label: "tape recording",
      value: status.tape_recording_enabled ? "on" : "off",
      note: `session ${status.tape_session_id || "-"} / rows ${status.recorded_tape_row_count || 0} / last ${formatDateTime(status.last_tape_write_time)}`,
    },
    {
      label: "opening window",
      value: status.opening_window_active ? "active" : "idle",
      note: `candidate ${status.opening_candidate_count || 0} / signal ${status.opening_signal_count || 0} / false positive ${status.opening_false_positive_count || 0}`,
    },
  ];
  el.statusDetailGrid.innerHTML = detailCards.map((item) => `
    <article class="status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");

  const operationCards = [
    { label: "운영 모드", value: sourceInfo.label, note: sourceInfo.note },
    { label: "producer heartbeat", value: heartbeatInfo.label, note: heartbeatInfo.note },
    { label: "상위 섹터 군집", value: status.top_sector_cluster || "확인 중", note: "오늘 장세를 끄는 섹터가 있다면 이 영역에 먼저 나타납니다." },
    { label: "휩쏘 위험", value: numberOrZero(status.current_whipsaw_risk).toFixed(1), note: "값이 높을수록 흔들림이 커 false positive가 늘기 쉬운 환경입니다." },
    { label: "추세 지속성", value: numberOrZero(status.current_trend_persistence).toFixed(1), note: "값이 높을수록 장중 흐름이 오후까지 이어지는 편입니다." },
    { label: "과열 환경", value: numberOrZero(status.current_overextension_environment).toFixed(1), note: "값이 높을수록 늦은 추격형 후보가 늘기 쉬운 환경입니다." },
    { label: "최근 오류", value: status.last_error_code || "없음", note: status.last_error_message || "최근 오류가 없습니다." },
    { label: "진단 상태", value: diagnosticsInfo.label, note: diagnosticsInfo.note },
    { label: "closeout", value: status.session_bundle_available ? "available" : "pending", note: status.closeout_generated_at ? `generated ${formatDateTime(status.closeout_generated_at)}` : "장마감 후 closeout bundle이 생성되면 여기에 표시됩니다." },
    { label: "monitoring level", value: status.monitoring_level || "normal", note: status.monitoring_level === "monitor" ? "장중 상세 기록 강화 모드입니다." : "일반 운영 기록 모드입니다." },
  ];
  el.operationsGrid.innerHTML = operationCards.map((item) => `
    <article class="status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");

  const regimeReasons = safeArray(status.market_regime_reasons);
  const notes = [...safeArray(status.runtime_notes), ...regimeReasons, ...Array.from(state.setupNotes)];
  el.runtimeNotes.innerHTML = notes.length
    ? notes.map((note) => {
      const tone = String(note).includes("오류")
        ? "error"
        : String(note).includes("fallback") || String(note).includes("없") || String(note).includes("대기")
          ? "warn"
          : "";
      return `<div class="note-item ${tone}">${escapeHtml(note)}</div>`;
    }).join("")
    : `<div class="empty">운영 메모가 아직 없습니다.</div>`;

  renderDiagnosticList(
    el.diagnosticList,
    state.diagnosticsRows,
    "최근 진단 기록이 아직 없습니다.",
    (row) => `
      <article class="diagnostic-item ${escapeHtml(String(row.severity || "info").toLowerCase())}">
        <strong>
          <span>${escapeHtml(row.kind || "diagnostic")}</span>
          <span>${escapeHtml(formatDateTime(row.created_at))}</span>
        </strong>
        <p>${escapeHtml(row.message || "상세 메시지가 없습니다.")}</p>
      </article>
    `,
  );
}

function renderSettingsV2() {
  const { inputRow, activePreset, recommendedPreset, effective, inputSnapshot, selectedPresetSnapshot } = currentComparisonState();
  const autoEnabled = !!inputRow.auto_preset_enabled;
  const regimeRecommendedPreset = presetByName(state.status?.regime_matched_preset_name);
  const fetchState = state.settingsFetchState || { status: "idle", note: "" };
  const inputPresetIsTest = isTestPreset(inputRow.selected_preset_name || state.status?.active_preset_name);

  el.selectedPresetName.innerHTML = state.presetRows
    .map((row) => `<option value="${escapeHtml(row.preset_name)}">${escapeHtml(row.label)}</option>`)
    .join("");
  el.selectedPresetName.value = inputRow.selected_preset_name || recommendedPreset.preset_name;
  syncSettingsInputs(inputRow);

  const effectiveDiffCount = SETTINGS_FIELDS.filter((field) => {
    const inputValue = inputSnapshot[field.key];
    const effectiveValue = effective[field.key];
    if (field.type === "bool") return Boolean(inputValue) !== Boolean(effectiveValue);
    return !approxEqual(inputValue, effectiveValue);
  }).length;

  el.settingsSummary.textContent = autoEnabled
    ? `자동 추천이 켜져 있어 현재는 ${activePreset.label} 기준이 우선 적용됩니다. 입력값과 실제 적용값, 장세 기반 추천값을 함께 비교할 수 있습니다.`
    : "수동 입력값을 기준으로 전체 탐지층과 실시간 신호층의 판단값을 직접 조절할 수 있습니다.";
  if (fetchState.note) {
    el.settingsSummary.textContent += ` ${fetchState.note}`;
  }

  el.settingsMeta.innerHTML = [
    {
      label: "입력값 저장 시각",
      value: formatDateTime(inputRow.updated_at),
      note: `${changedSourceLabel(inputRow.changed_source)} / ${inputRow.change_reason || "최근 변경 사유 없음"}`,
    },
    {
      label: "시간대 추천 preset",
      value: recommendedPreset.label,
      note: recommendedPreset.reason || "현재 시간대에 맞는 추천 기준입니다.",
    },
    {
      label: "장세 추천 preset",
      value: regimeRecommendedPreset?.label || state.status?.regime_matched_preset_label || "확인 중",
      note: state.status?.regime_matched_preset_reason || "장세 해석이 쌓이면 더 맥락 있는 추천 preset을 함께 보여줍니다.",
    },
    {
      label: "현재 적용값",
      value: activePreset.label,
      note: inputPresetIsTest
        ? `${formatDateTime(state.status?.signal_settings_applied_at)} 기준으로 러너가 사용 중입니다. 테스트용 preset이라 후보가 많이 잡힐 수 있습니다.`
        : `${formatDateTime(state.status?.signal_settings_applied_at)} 기준으로 러너가 사용 중입니다.`,
    },
    {
      label: "자동 추천 상태",
      value: autoEnabled ? "자동추천 적용 중" : "수동 설정 유지 중",
      note: autoEnabled
        ? "자동추천이 켜져 있으면 실제 적용값이 시간대 또는 장세 추천 preset 기준으로 일부 덮어써질 수 있습니다."
        : "자동추천이 꺼져 있어 사용자가 저장한 수동 설정을 유지합니다.",
    },
    {
      label: "설정 읽기 상태",
      value: fetchState.status || "ok",
      note: fetchState.note || "설정값을 정상적으로 읽고 있습니다.",
    },
    {
      label: "입력값과 차이",
      value: effectiveDiffCount ? `${effectiveDiffCount}개 항목 조정됨` : "입력값과 동일",
      note: autoEnabled
        ? "자동 추천이 켜져 있으면 시간대에 따라 일부 값이 추천 preset 기준으로 덮어써질 수 있습니다."
        : "자동 추천이 꺼져 있어 저장한 값이 그대로 적용됩니다.",
    },
  ].map((item) => `
    <article class="meta-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");

  el.settingsHelpList.innerHTML = SETTINGS_FIELDS.map((field) => `
    <article class="help-card">
      <span class="field-badge">${escapeHtml(sectionLabel(field.section))}</span>
      <strong>${escapeHtml(field.label)}</strong>
      <p>${escapeHtml(field.shortHelp)}</p>
      <p>${escapeHtml(field.detailHelp)}</p>
    </article>
  `).join("");

  el.presetRow.innerHTML = state.presetRows.map((preset) => {
    const active = preset.preset_name === (state.status?.active_preset_name || inputRow.active_preset_name);
    const regimeTags = safeArray(preset.regime_tags);
    const isRegimeMatched = preset.preset_name === (state.status?.regime_matched_preset_name || "");
    const isTest = isTestPreset(preset.preset_name);
    return `
      <article class="preset-card ${isTest ? "test-preset" : ""}">
        <strong>${escapeHtml(preset.label)}</strong>
        <span>${active ? "현재 적용 중" : isRegimeMatched ? "장세 추천" : "추천값"}</span>
        <p>${escapeHtml(preset.description || "")}</p>
        <div class="chips">
          ${isTest ? '<span class="chip warn">테스트 전용</span>' : ""}
          <span class="chip">스캔 ${escapeHtml(formatThresholdValue("broad_scan_window_minutes", preset.broad_scan_window_minutes))}</span>
          <span class="chip">후보 ${escapeHtml(formatThresholdValue("candidate_threshold", preset.candidate_threshold))}</span>
          <span class="chip">초기 RVOL ${escapeHtml(formatThresholdValue("early_rvol_threshold", preset.early_rvol_threshold))}</span>
          <span class="chip">비교 ${escapeHtml(formatThresholdValue("compare_window_minutes", preset.compare_window_minutes))}</span>
          <span class="chip">RVOL ${escapeHtml(formatThresholdValue("rvol_threshold", preset.rvol_threshold))}</span>
          <span class="chip">turnover ${escapeHtml(formatThresholdValue("turnover_ratio_threshold", preset.turnover_ratio_threshold))}</span>
          <span class="chip">신호점수 ${escapeHtml(formatThresholdValue("min_signal_score", preset.min_signal_score))}</span>
          ${regimeTags.map((tag) => `<span class="chip ${escapeHtml(regimeTone(tag))}">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <p>${escapeHtml(preset.regime_note || preset.reason || "")}</p>
        <p>고급 안전 하한 ${escapeHtml(formatThresholdValue("min_trade_value_eok", preset.min_trade_value_eok))}</p>
        <div class="button-row" style="margin-top:12px;">
          <button class="secondary" data-preset="${escapeHtml(preset.preset_name)}" type="button">추천값 적용</button>
        </div>
      </article>
    `;
  }).join("");

  el.settingsCompareIntro.textContent = autoEnabled
    ? "자동 추천이 켜져 있으면 시간대에 맞는 추천 preset 값이 현재 적용값에 우선 반영됩니다. 장세 기반 추천과 실제 적용값의 차이를 함께 비교해 보세요."
    : "수동 입력값이 그대로 적용되고, 현재 적용값 칸에서는 러너가 실제로 사용 중인 기준을 확인할 수 있습니다.";

  el.settingsCompareBody.innerHTML = SETTINGS_FIELDS.map((field) => {
    const inputValue = inputSnapshot[field.key];
    const recommendedValue = selectedPresetSnapshot[field.key];
    const effectiveValue = effective[field.key];
    const changed = field.type === "bool" ? Boolean(inputValue) !== Boolean(effectiveValue) : !approxEqual(inputValue, effectiveValue);
    return `
      <tr>
        <td>
          <strong>${escapeHtml(field.label)}</strong>
          <small>${escapeHtml(sectionLabel(field.section))}</small>
        </td>
        <td><span class="comparison-value">${escapeHtml(formatThresholdValue(field.key, inputValue))}</span></td>
        <td><span class="comparison-value">${escapeHtml(formatThresholdValue(field.key, recommendedValue))}</span></td>
        <td>
          <span class="comparison-value">
            ${escapeHtml(formatThresholdValue(field.key, effectiveValue))}
            ${changed ? '<span class="override-mark">입력값과 다름</span>' : ""}
          </span>
        </td>
      </tr>
    `;
  }).join("");

  setSettingsFlash(state.saveState.type, state.saveState.text);
}

function renderSessionReview() {
  const sessionSummary = currentSessionSummary();
  const candidateSummary = sessionSummary.candidate_summary || {};
  const overall = sessionSummary.overall || {};
  const qualityValidation = sessionSummary.quality_validation || {};
  const eventSummary = safeArray(sessionSummary.session_event_summary);
  const recommendedAdjustments = safeArray(sessionSummary.recommended_adjustments)
    .map((row) => ({ ...row, metrics: parseMaybeJson(row.metrics, row.metrics || {}) }));
  const timelineRows = safeArray(sessionSummary.session_timeline).map((row) => normalizeRow(row));
  const regimeReasons = safeArray(sessionSummary.market_regime_reasons);
  const similarRegimes = safeArray(sessionSummary.similar_past_regimes);
  const regimeHistory = safeArray(sessionSummary.regime_history_summary);

  state.sessionEventRows = timelineRows;
  upsertDetailIndex(timelineRows);

  const reviewCards = [
    {
      label: "오늘 세션 요약",
      value: state.sessionReport?.session_date || "-",
      note: `${sessionSummary.active_preset_label || sessionSummary.active_preset_name || "preset 확인 중"} 기준으로 자동 복기가 정리됩니다.`,
    },
    {
      label: "후보 -> 집중 감시",
      value: `${numberOrZero(candidateSummary.candidate_to_focused_conversion_rate).toFixed(1)}%`,
      note: `초기 후보 ${candidateSummary.early_detection_count ?? 0}건 중 ${candidateSummary.promotion_count ?? 0}건이 집중 감시로 올라갔습니다.`,
    },
    {
      label: "집중 감시 -> 확정 신호",
      value: `${numberOrZero(candidateSummary.focused_to_signal_conversion_rate).toFixed(1)}%`,
      note: `확정 신호까지 이어진 평균 시간은 ${numberOrZero(candidateSummary.avg_minutes_to_signal).toFixed(1)}분입니다.`,
    },
    {
      label: "거짓 후보 비율",
      value: `${numberOrZero(candidateSummary.false_positive_candidate_ratio).toFixed(1)}%`,
      note: `과열 추격 감점 후보 비율은 ${numberOrZero(candidateSummary.overextended_candidate_ratio).toFixed(1)}%입니다.`,
    },
    {
      label: "평균 수익률",
      value: formatPct(overall.avg_pnl_pct || 0),
      note: `종료 거래 ${overall.closed_count ?? 0}건 / 익절 ${overall.profit_take_count ?? 0}건 / 손절 ${overall.stop_loss_count ?? 0}건입니다.`,
    },
    {
      label: "평균 보유 시간",
      value: formatHolding(overall.avg_holding_seconds || 0),
      note: `추적손절 ${overall.trailing_stop_count ?? 0}건 / 모멘텀 약화 ${overall.momentum_loss_count ?? 0}건을 포함합니다.`,
    },
  ];
  el.historyReviewCards.innerHTML = reviewCards.map((item) => `
    <article class="list-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join("");

  if (el.historyRegimeCards) {
    const regimeCards = [
      {
        label: "오늘의 장세",
        value: sessionSummary.market_regime_label || "확인 중",
        note: sessionSummary.regime_summary || "장세 해석 데이터가 아직 충분하지 않습니다.",
      },
      {
        label: "장세 신뢰도",
        value: `${numberOrZero(sessionSummary.market_regime_confidence).toFixed(1)}%`,
        note: `휩쏘 ${numberOrZero(sessionSummary.whipsaw_score).toFixed(1)} / 추세 지속 ${numberOrZero(sessionSummary.trend_persistence_score).toFixed(1)}`,
      },
      {
        label: "상위 섹터 군집",
        value: sessionSummary.top_sector_cluster || "확인 중",
        note: `섹터 집중 ${numberOrZero(sessionSummary.sector_concentration_score).toFixed(1)} / breadth 유사 ${numberOrZero(sessionSummary.breadth_like_score).toFixed(1)}`,
      },
      {
        label: "잘 먹힌 preset",
        value: presetLabelByName(sessionSummary.best_preset_name || sessionSummary.regime_matched_preset_name) || sessionSummary.regime_matched_preset_label || "확인 중",
        note: sessionSummary.regime_matched_preset_reason || "오늘 장세에 잘 맞았던 preset 흐름을 함께 정리합니다.",
      },
      {
        label: "잘 먹힌 후보 유형",
        value: sessionSummary.best_candidate_type || "확인 중",
        note: "오늘 초기 포착에서 상대적으로 유효했던 후보 유형입니다.",
      },
      {
        label: "잘 먹힌 신호 유형",
        value: sessionSummary.best_signal_type || "확인 중",
        note: "오늘 확정 신호에서 상대적으로 유효했던 신호 유형입니다.",
      },
    ];
    el.historyRegimeCards.innerHTML = regimeCards.map((item) => `
      <article class="list-card">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.value)}</span>
        <p>${escapeHtml(item.note)}</p>
      </article>
    `).join("");
  }

  if (el.historyRegimeReasons) {
    const historyChips = regimeHistory.slice(0, 3).map((item) => `${item.market_regime_label} 평균 전환율 ${numberOrZero(item.avg_candidate_to_signal_conversion_rate).toFixed(1)}%`);
    const reasonChips = [...regimeReasons, ...historyChips];
    el.historyRegimeReasons.innerHTML = reasonChips.length
      ? reasonChips.map((item) => `<span class="chip ${escapeHtml(regimeTone(sessionSummary.market_regime))}">${escapeHtml(item)}</span>`).join("")
      : '<div class="empty">장세 판단 이유가 아직 충분히 쌓이지 않았습니다.</div>';
  }

  if (el.historySimilarRegimes) {
    el.historySimilarRegimes.innerHTML = similarRegimes.length
      ? similarRegimes.map((item) => `
        <article class="similar-session-card">
          <strong>${escapeHtml(item.session_date || "-")}</strong>
          <span>${escapeHtml(item.market_regime_label || item.market_regime || "장세 확인 중")} / 유사도 ${escapeHtml(numberOrZero(item.similarity_score).toFixed(1))}%</span>
          <p>${escapeHtml(item.summary_line || "유사 장세의 요약이 아직 없습니다.")}</p>
          <div class="chips">
            <span class="chip">${escapeHtml(item.best_preset_label || "preset 확인 중")}</span>
            <span class="chip">${escapeHtml(item.best_candidate_type || "후보 유형 확인 중")}</span>
            <span class="chip">${escapeHtml(item.best_signal_type || "신호 유형 확인 중")}</span>
            <span class="chip">전환율 ${escapeHtml(numberOrZero(item.candidate_to_signal_conversion_rate).toFixed(1))}%</span>
          </div>
        </article>
      `).join("")
      : '<div class="empty">비슷한 과거 장세가 아직 충분히 쌓이지 않았습니다.</div>';
  }

  el.historyRecommendationList.innerHTML = recommendedAdjustments.length
    ? recommendedAdjustments.map((item) => {
      const metricChips = Object.entries(item.metrics || {}).map(([metricKey, metricValue]) => `
        <span class="chip">${escapeHtml(recommendationMetricLabel(metricKey))} ${escapeHtml(formatRecommendationMetric(metricKey, metricValue))}</span>
      `).join("");
      let fillButton = `<button class="ghost recommendation-action" type="button" data-tab-target="settings">설정 탭에서 확인</button>`;
      if (item.field && item.field !== "preset_review") {
        fillButton = `<button class="secondary recommendation-action" type="button" data-recommend-field="${escapeHtml(item.field)}" data-recommend-value="${escapeHtml(String(item.recommended_value ?? ""))}">입력값에 채우기</button>`;
      } else if (item.field === "preset_review" && presetByName(item.recommended_value)) {
        fillButton = `<button class="secondary recommendation-action" type="button" data-recommend-preset="${escapeHtml(String(item.recommended_value ?? ""))}">추천 preset 채우기</button>`;
      }
      return `
        <article class="recommendation-card">
          <div class="signal-head">
            <div>
              <h3>${escapeHtml(recommendationFieldLabel(item.field))}</h3>
              <div class="signal-meta">현재 ${escapeHtml(recommendationValueText(item.field, item.current_value))} -> 추천 ${escapeHtml(recommendationValueText(item.field, item.recommended_value))}</div>
            </div>
            <div class="button-row">
              ${fillButton}
            </div>
          </div>
          <p class="signal-summary">${escapeHtml(item.reason || "오늘 세션 결과를 바탕으로 다음 운영에서 검토해 볼 만한 조정 제안입니다.")}</p>
          <div class="signal-tags">${metricChips}</div>
        </article>
      `;
    }).join("")
    : '<div class="empty">오늘 세션 기준으로는 자동 조정 제안이 아직 없습니다. 지금 기준을 그대로 유지해도 괜찮습니다.</div>';

  const qualityCards = [
    {
      label: "품질 상위군 전환율",
      value: `${numberOrZero(qualityValidation.top_quality_conversion_rate).toFixed(1)}%`,
      note: "후보 품질 상위 구간이 실제 확정 신호로 얼마나 이어졌는지 보여줍니다.",
    },
    {
      label: "품질 하위군 false positive",
      value: `${numberOrZero(qualityValidation.low_quality_false_positive_ratio).toFixed(1)}%`,
      note: "품질 점수가 낮은 후보가 실제로 불안한 후보였는지 다시 확인합니다.",
    },
    {
      label: "이벤트 로그 수",
      value: String(eventSummary.reduce((sum, item) => sum + numberOrZero(item.count), 0)),
      note: "후보 생성, 승격, 신호, 설정 변경, 오류 등 세션 단위 이벤트가 저장된 건수입니다.",
    },
    {
      label: "검증 모드",
      value: sessionSummary.validation_mode_enabled ? "활성" : "기본 운영",
      note: sessionSummary.validation_mode_enabled
        ? "실시장 검증용 로그가 더 자세하게 쌓이고 있습니다."
        : "기본 운영 기준 로그만 쌓이고 있습니다.",
    },
  ];

  const qualityChips = [
    ...safeArray(qualityValidation.quality_vs_outcome).slice(0, 3).map((item) => `품질 ${item.label} ${item.count}건 / 성공률 ${numberOrZero(item.win_rate).toFixed(1)}%`),
    ...safeArray(qualityValidation.quality_vs_lead_time).slice(0, 2).map((item) => `품질 ${item.label} 평균 ${numberOrZero(item.avg_pnl_pct).toFixed(1)}분`),
    ...eventSummary.slice(0, 3).map((item) => `${sessionEventLabel(item.label)} ${item.count}건`),
  ];
  el.historyQualityCards.innerHTML = `
    <div class="history-summary-grid">
      ${qualityCards.map((item) => `
        <article class="list-card">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.value)}</span>
          <p>${escapeHtml(item.note)}</p>
        </article>
      `).join("")}
    </div>
    <div class="chips">${qualityChips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("")}</div>
  `;

  el.historyTimelineList.innerHTML = timelineRows.length
    ? timelineRows.map((row) => {
      const detail = detailFromRow(row);
      const timelineKey = row.event_id || row.signal_id || row.position_id || row.candidate_id || row.code;
      const tags = [
        row.preset_label || row.preset_name || "",
        row.candidate_type || "",
        row.signal_type || "",
        row.outcome_label || "",
      ].filter(Boolean).slice(0, 4);
      return `
        <article class="timeline-item">
          <div class="timeline-time">${escapeHtml(formatDateTime(row.event_time || row.created_at))}</div>
          <div class="timeline-body">
            <strong>${escapeHtml(sessionEventLabel(row.event_type))}</strong>
            <p>${escapeHtml(row.summary || detail.signal_summary || "세션 흐름을 복기할 수 있도록 이벤트가 저장되어 있습니다.")}</p>
            <div class="chips">
              <span class="chip">${escapeHtml(row.name || row.code || "시장 이벤트")}</span>
              ${tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}
              ${numberOrZero(row.candidate_quality_score) > 0 ? `<span class="chip">품질 ${escapeHtml(numberOrZero(row.candidate_quality_score).toFixed(1))}</span>` : ""}
              ${numberOrZero(row.signal_score) > 0 ? `<span class="chip">신호점수 ${escapeHtml(numberOrZero(row.signal_score).toFixed(1))}</span>` : ""}
            </div>
          </div>
          <div class="button-row">
            <button class="ghost" data-detail-id="${escapeHtml(timelineKey)}" type="button">자세히</button>
          </div>
        </article>
      `;
    }).join("")
    : '<div class="empty">세션 타임라인이 아직 없습니다. 장중 이벤트가 쌓이면 여기에서 하루 흐름을 시간순으로 복기할 수 있습니다.</div>';
}

function recommendationMetricLabel(metricKey) {
  const mapping = {
    false_positive_ratio: "false positive 비율",
    early_detection_count: "초기 후보 수",
    overextended_ratio: "과열 추격 비율",
    focused_to_signal_conversion_rate: "집중 감시 -> 신호 전환율",
    promotion_count: "집중 감시 승격 수",
    win_rate: "승률",
    avg_pnl_pct: "평균 수익률",
    candidate_to_signal_conversion_rate: "후보 -> 신호 전환율",
    preset: "검토 대상 preset",
    best_preset: "비교 기준 preset",
    market_regime: "장세",
    regime_confidence: "장세 신뢰도",
    regime_reason: "장세 판단 이유",
    similar_session: "유사 장세 날짜",
    suggested_preset: "추천 preset",
    recommended_preset_hit: "추천 preset 검토",
    actual_vs_recommended_gap: "실사용 대비 gap",
    regime_stability_score: "장세 안정도",
  };
  return mapping[metricKey] || metricKey;
}

function renderSessionReview() {
  const sessionSummary = currentSessionSummary();
  const candidateSummary = sessionSummary.candidate_summary || {};
  const overall = sessionSummary.overall || {};
  const qualityValidation = sessionSummary.quality_validation || {};
  const eventSummary = safeArray(sessionSummary.session_event_summary);
  const recommendedAdjustments = safeArray(sessionSummary.recommended_adjustments)
    .map((row) => ({ ...row, metrics: parseMaybeJson(row.metrics, row.metrics || {}) }));
  const timelineRows = safeArray(sessionSummary.session_timeline).map((row) => normalizeRow(row));
  const regimeReasons = safeArray(sessionSummary.market_regime_reasons);
  const similarRegimes = safeArray(sessionSummary.similar_past_regimes);
  const regimeHistory = safeArray(sessionSummary.regime_history_summary);
  const presetCurrentRegime = safeArray(sessionSummary.preset_effectiveness_current_regime);
  const presetOverall = safeArray(sessionSummary.preset_effectiveness_overall);
  const actualVsRecommended = parseMaybeJson(sessionSummary.actual_vs_recommended_preset, sessionSummary.actual_vs_recommended_preset || {});
  const presetMergeCandidates = safeArray(sessionSummary.preset_merge_candidates);
  const presetSplitCandidates = safeArray(sessionSummary.preset_split_candidates);
  const presetRetireCandidates = safeArray(sessionSummary.preset_retire_candidates);
  const candidateBestPatterns = safeArray(sessionSummary.candidate_best_patterns);
  const candidateCautionPatterns = safeArray(sessionSummary.candidate_caution_patterns);
  const signalBestPatterns = safeArray(sessionSummary.signal_best_patterns);
  const signalCautionPatterns = safeArray(sessionSummary.signal_caution_patterns);
  const bestConversionPatterns = safeArray(sessionSummary.best_conversion_patterns);
  const worstFalsePositivePatterns = safeArray(sessionSummary.worst_false_positive_patterns);
  const regimeShiftEvents = safeArray(sessionSummary.regime_shift_events);
  const presetMatchReview = parseMaybeJson(sessionSummary.preset_match_review, sessionSummary.preset_match_review || {});
  const rollingReview5d = parseMaybeJson(sessionSummary.rolling_review_5d, sessionSummary.rolling_review_5d || {});
  const rollingReview20d = parseMaybeJson(sessionSummary.rolling_review_20d, sessionSummary.rolling_review_20d || {});
  const weeklyReview = parseMaybeJson(sessionSummary.weekly_review, sessionSummary.weekly_review || {});
  const presetStabilityRows = safeArray(sessionSummary.preset_stability_rows);
  const optimizationWarnings = safeArray(sessionSummary.optimization_warnings);
  const confidenceGatingNotes = safeArray(sessionSummary.confidence_gating_notes);
  const signalValidationSummary = parseMaybeJson(sessionSummary.signal_validation_summary, sessionSummary.signal_validation_summary || {});
  const signalValidationPreview = safeArray(sessionSummary.signal_validation_preview).map((row) => normalizeRow({ ...row, event_id: row.validation_id || row.signal_id || row.position_id || row.code, detail: { ...row, ...(row.detail || {}) } }));
  const experimentReports = safeArray(sessionSummary.experiment_reports).map((row) => ({ ...row, summary: parseMaybeJson(row.summary, row.summary || {}) }));
  const experimentSupport = parseMaybeJson(sessionSummary.experiment_support_summary, sessionSummary.experiment_support_summary || {});

  state.sessionEventRows = timelineRows;
  upsertDetailIndex(timelineRows);
  upsertDetailIndex(signalValidationPreview);

  const reviewCards = [
    {
      label: "오늘 세션 요약",
      value: state.sessionReport?.session_date || "-",
      note: `${sessionSummary.active_preset_label || sessionSummary.active_preset_name || "preset 확인 중"} 기준으로 오늘 흐름을 복기합니다.`,
    },
    {
      label: "후보 -> 집중 감시",
      value: `${numberOrZero(candidateSummary.candidate_to_focused_conversion_rate).toFixed(1)}%`,
      note: `초기 후보 ${candidateSummary.early_detection_count ?? 0}건 중 ${candidateSummary.promotion_count ?? 0}건이 집중 감시로 승격됐습니다.`,
    },
    {
      label: "집중 감시 -> 확정 신호",
      value: `${numberOrZero(candidateSummary.focused_to_signal_conversion_rate).toFixed(1)}%`,
      note: `확정 신호까지 이어지는 평균 시간은 ${numberOrZero(candidateSummary.avg_minutes_to_signal).toFixed(1)}분입니다.`,
    },
    {
      label: "거짓 후보 비율",
      value: `${numberOrZero(candidateSummary.false_positive_candidate_ratio).toFixed(1)}%`,
      note: `과열 추격 감점 후보 비율은 ${numberOrZero(candidateSummary.overextended_candidate_ratio).toFixed(1)}%입니다.`,
    },
    {
      label: "평균 수익률",
      value: formatPct(overall.avg_pnl_pct || 0),
      note: `종료 거래 ${overall.closed_count ?? 0}건 / 익절 ${overall.profit_take_count ?? 0}건 / 손절 ${overall.stop_loss_count ?? 0}건입니다.`,
    },
    {
      label: "평균 보유 시간",
      value: formatHolding(overall.avg_holding_seconds || 0),
      note: `추적손절 ${overall.trailing_stop_count ?? 0}건 / 탄력 약화 ${overall.momentum_loss_count ?? 0}건을 포함합니다.`,
    },
  ];
  el.historyReviewCards.innerHTML = reviewCards.map((item) => `
    <article class="list-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join("");

  if (el.historySignalValidation) {
    el.historySignalValidation.innerHTML = renderSignalValidationPanel(signalValidationSummary, signalValidationPreview);
  }

  if (el.historyRegimeCards) {
    const regimeCards = [
      {
        label: "오늘의 장세",
        value: sessionSummary.market_regime_label || "확인 중",
        note: sessionSummary.regime_summary || "장세 해석 데이터가 아직 충분하지 않습니다.",
      },
      {
        label: "장세 신뢰도",
        value: `${numberOrZero(sessionSummary.market_regime_confidence).toFixed(1)}%`,
        note: `휩쏘 ${numberOrZero(sessionSummary.whipsaw_score).toFixed(1)} / 추세 지속 ${numberOrZero(sessionSummary.trend_persistence_score).toFixed(1)}`,
      },
      {
        label: "상위 섹터 군집",
        value: sessionSummary.top_sector_cluster || "확인 중",
        note: `섹터 집중 ${numberOrZero(sessionSummary.sector_concentration_score).toFixed(1)} / breadth 유사 ${numberOrZero(sessionSummary.breadth_like_score).toFixed(1)}`,
      },
      {
        label: "장세 추천 preset",
        value: presetLabelByName(sessionSummary.regime_matched_preset_name) || sessionSummary.regime_matched_preset_label || "확인 중",
        note: sessionSummary.regime_matched_preset_reason || "오늘 장세와 맞는 preset을 함께 비교합니다.",
      },
      {
        label: "잘 맞은 후보 유형",
        value: sessionSummary.best_candidate_type || "확인 중",
        note: "오늘 초기 포착 단계에서 상대적으로 유효했던 후보 유형입니다.",
      },
      {
        label: "잘 맞은 신호 유형",
        value: sessionSummary.best_signal_type || "확인 중",
        note: "오늘 확정 신호 단계에서 상대적으로 유효했던 신호 유형입니다.",
      },
    ];
    el.historyRegimeCards.innerHTML = regimeCards.map((item) => `
      <article class="list-card">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.value)}</span>
        <p>${escapeHtml(item.note)}</p>
      </article>
    `).join("");
  }

  if (el.historyRegimeReasons) {
    const historyChips = regimeHistory.slice(0, 3).map((item) => `${item.market_regime_label} 평균 전환율 ${numberOrZero(item.avg_candidate_to_signal_conversion_rate).toFixed(1)}%`);
    const reasonChips = [...regimeReasons, ...historyChips];
    el.historyRegimeReasons.innerHTML = reasonChips.length
      ? reasonChips.map((item) => `<span class="chip ${escapeHtml(regimeTone(sessionSummary.market_regime))}">${escapeHtml(item)}</span>`).join("")
      : '<div class="empty">장세 판단 이유가 아직 충분히 모이지 않았습니다.</div>';
  }

  if (el.historySimilarRegimes) {
    el.historySimilarRegimes.innerHTML = similarRegimes.length
      ? similarRegimes.map((item) => `
        <article class="similar-session-card">
          <strong>${escapeHtml(item.session_date || "-")}</strong>
          <span>${escapeHtml(item.market_regime_label || item.market_regime || "장세 확인 중")} / 유사도 ${escapeHtml(numberOrZero(item.similarity_score).toFixed(1))}%</span>
          <p>${escapeHtml(item.summary_line || "유사 장세 요약이 아직 없습니다.")}</p>
          <div class="chips">
            <span class="chip">${escapeHtml(item.best_preset_label || "preset 확인 중")}</span>
            <span class="chip">${escapeHtml(item.best_candidate_type || "후보 유형 확인 중")}</span>
            <span class="chip">${escapeHtml(item.best_signal_type || "신호 유형 확인 중")}</span>
            <span class="chip">전환율 ${escapeHtml(numberOrZero(item.candidate_to_signal_conversion_rate).toFixed(1))}%</span>
          </div>
        </article>
      `).join("")
      : '<div class="empty">비슷한 과거 장세가 아직 충분히 쌓이지 않았습니다.</div>';
  }

  if (el.historyRecommendationConfidence) {
    const confidenceCards = [
      {
        label: "오늘 기준",
        score: numberOrZero(sessionSummary.current_recommendation_confidence),
        confidence: recommendedAdjustments[0]?.recommendation_confidence || "very_low",
        confidenceLabel: recommendedAdjustments[0]?.recommendation_confidence_label || "참고 수준",
        sample: recommendedAdjustments[0]?.sample_size || 0,
        note: recommendedAdjustments[0]?.sample_note || "오늘 기준 추천은 기본적으로 단기 참고용으로 해석합니다.",
      },
      {
        label: "최근 5거래일",
        score: numberOrZero(rollingReview5d.recommendation_confidence_score),
        confidence: rollingReview5d.recommendation_confidence || "very_low",
        confidenceLabel: rollingReview5d.recommendation_confidence_label || "참고 수준",
        sample: rollingReview5d.session_count || 0,
        note: rollingReview5d.sample_note || "최근 5거래일 누적 기준으로 추천 강도를 다시 봅니다.",
      },
      {
        label: "최근 20거래일",
        score: numberOrZero(rollingReview20d.recommendation_confidence_score),
        confidence: rollingReview20d.recommendation_confidence || "very_low",
        confidenceLabel: rollingReview20d.recommendation_confidence_label || "참고 수준",
        sample: rollingReview20d.session_count || 0,
        note: rollingReview20d.sample_note || "최근 20거래일 누적 흐름을 함께 봐서 하루치 우연을 줄입니다.",
      },
      {
        label: "이번 주 누적",
        score: numberOrZero(weeklyReview.recommendation_confidence_score),
        confidence: weeklyReview.recommendation_confidence || "very_low",
        confidenceLabel: weeklyReview.recommendation_confidence_label || "참고 수준",
        sample: weeklyReview.session_count || 0,
        note: weeklyReview.sample_note || "이번 주 흐름을 따로 떼어 보며 중간 복기에 활용합니다.",
      },
    ];
    el.historyRecommendationConfidence.innerHTML = `
      <div class="history-summary-grid">
        ${confidenceCards.map((item) => `
          <article class="list-card">
            <strong>${escapeHtml(item.label)}</strong>
            <span>${escapeHtml(`${confidenceLabelText(item.confidence, item.confidenceLabel)} / ${numberOrZero(item.score).toFixed(1)}`)}</span>
            <p>${escapeHtml(`표본 ${numberOrZero(item.sample).toFixed(0)}세션 · ${item.note}`)}</p>
          </article>
        `).join("")}
      </div>
      <div class="chips">
        <span class="chip">${escapeHtml(`최근 표본 상태 ${sessionSummary.recent_sample_sufficiency || "확인 중"}`)}</span>
        <span class="chip">${escapeHtml(`과최적화 경고 ${sessionSummary.optimization_warning_label || "관찰"}`)}</span>
        ${confidenceGatingNotes.slice(0, 4).map((note) => `<span class="chip warn">${escapeHtml(note)}</span>`).join("")}
      </div>
    `;
  }

  if (el.historyRollingReview) {
    el.historyRollingReview.innerHTML = `
      <div class="analysis-list">
        ${renderRollingReviewCard(rollingReview5d, "최근 5거래일 표본이 아직 충분하지 않습니다.")}
        ${renderRollingReviewCard(rollingReview20d, "최근 20거래일 누적 리뷰가 아직 충분히 쌓이지 않았습니다.")}
        ${renderRollingReviewCard(weeklyReview, "이번 주 누적 리뷰는 세션이 더 쌓이면 더 안정적으로 보입니다.")}
      </div>
    `;
  }

  if (el.historyExperimentCards) {
    el.historyExperimentCards.innerHTML = renderExperimentSummaryCards(experimentReports, experimentSupport);
  }

  if (el.historyExperimentList) {
    el.historyExperimentList.innerHTML = renderExperimentReportList(experimentReports);
  }

  if (el.historyPresetPerformance) {
    const performanceRows = (presetCurrentRegime.length ? presetCurrentRegime : presetOverall).slice(0, 4);
    const recommendedName = actualVsRecommended.recommended_preset_name || sessionSummary.regime_matched_preset_name || "";
    const recommendedLabel = presetLabelByName(recommendedName) || actualVsRecommended.recommended_preset_label || sessionSummary.regime_matched_preset_label || recommendedName;
    const actualLabel = presetLabelByName(actualVsRecommended.actual_preset_name) || actualVsRecommended.actual_preset_label || sessionSummary.active_preset_label || sessionSummary.active_preset_name || "확인 중";
    const hitLabel = sessionSummary.recommended_preset_hit_label || "자료 부족";
    const gapText = `${numberOrZero(sessionSummary.actual_vs_recommended_gap).toFixed(1)}점`;
    el.historyPresetPerformance.innerHTML = `
      <div class="history-summary-grid">
        <article class="list-card">
          <strong>추천 preset 검토</strong>
          <span>${escapeHtml(hitLabel)}</span>
          <p>${escapeHtml(sessionSummary.recommended_preset_hit_reason || "추천 preset 적중률은 세션이 더 쌓일수록 더 정확해집니다.")}</p>
        </article>
        <article class="list-card">
          <strong>실사용 vs 추천 gap</strong>
          <span>${escapeHtml(gapText)}</span>
          <p>${escapeHtml(actualVsRecommended.note || "실제 사용 preset과 장세 추천 preset의 차이를 함께 비교합니다.")}</p>
        </article>
        <article class="list-card">
          <strong>실제 사용 preset</strong>
          <span>${escapeHtml(actualLabel)}</span>
          <p>${escapeHtml(`효과 점수 ${numberOrZero(actualVsRecommended.actual_effectiveness_score).toFixed(1)} / 승률 ${numberOrZero(actualVsRecommended.actual_win_rate).toFixed(1)}%`)}</p>
        </article>
        <article class="list-card">
          <strong>장세 추천 preset</strong>
          <span>${escapeHtml(recommendedLabel || "없음")}</span>
          <p>${escapeHtml(`효과 점수 ${numberOrZero(actualVsRecommended.recommended_effectiveness_score).toFixed(1)} / 장세 ${sessionSummary.market_regime_label || "확인 중"}`)}</p>
          ${presetByName(recommendedName) ? `<div class="button-row" style="margin-top:10px;"><button class="secondary recommendation-action" type="button" data-recommend-preset="${escapeHtml(recommendedName)}">추천 preset 초안 채우기</button></div>` : ""}
        </article>
      </div>
      ${performanceRows.length ? `
        <div class="analysis-list">
          ${performanceRows.map((row) => `
            <article class="analysis-card">
              <strong>${escapeHtml(row.preset_label || row.preset_name)}</strong>
              <span>효과 점수 ${escapeHtml(numberOrZero(row.effectiveness_score).toFixed(1))}</span>
              <p>승률 ${escapeHtml(numberOrZero(row.win_rate).toFixed(1))}% / 평균 수익률 ${escapeHtml(formatPct(row.avg_pnl_pct || 0))} / 후보→신호 ${escapeHtml(numberOrZero(row.candidate_to_signal_conversion_rate).toFixed(1))}% / false positive ${escapeHtml(numberOrZero(row.false_positive_ratio).toFixed(1))}%</p>
            </article>
          `).join("")}
        </div>
      ` : '<div class="empty">장세별 preset 성과 비교에 필요한 세션이 아직 부족합니다.</div>'}
    `;
  }

  if (el.historyPresetStructure) {
    const sections = [];
    if (presetMergeCandidates.length) {
      sections.push(`
        <div class="analysis-stack">
          <h4>합치기 검토 preset</h4>
          ${presetMergeCandidates.map((item) => `
            <article class="analysis-card">
              <strong>${escapeHtml(item.left_preset_label || item.left_preset_name)} + ${escapeHtml(item.right_preset_label || item.right_preset_name)}</strong>
              <p>${escapeHtml(item.reason || "성과 차이가 작아 하나의 preset으로 묶어도 운영 판단이 크게 달라지지 않을 수 있습니다.")}</p>
              <div class="chips">
                <span class="chip">점수 차이 ${escapeHtml(numberOrZero(item.score_gap).toFixed(1))}</span>
                <span class="chip">수익률 차이 ${escapeHtml(formatPct(item.pnl_gap || 0))}</span>
                <span class="chip">false positive 차이 ${escapeHtml(numberOrZero(item.false_positive_gap).toFixed(1))}%</span>
              </div>
            </article>
          `).join("")}
        </div>
      `);
    }
    if (presetSplitCandidates.length) {
      sections.push(`
        <div class="analysis-stack">
          <h4>분화 검토 preset</h4>
          ${presetSplitCandidates.map((item) => `
            <article class="analysis-card">
              <strong>${escapeHtml(item.preset_label || item.preset_name)}</strong>
              <p>${escapeHtml(item.reason || "장세에 따라 성과 차이가 커 세부 preset으로 나누는 편이 더 설명 가능할 수 있습니다.")}</p>
              <div class="chips">
                <span class="chip">강한 장세 ${escapeHtml(item.best_regime_label || item.best_regime || "-")}</span>
                <span class="chip">약한 장세 ${escapeHtml(item.worst_regime_label || item.worst_regime || "-")}</span>
                <span class="chip">점수 차이 ${escapeHtml(numberOrZero(item.score_gap).toFixed(1))}</span>
              </div>
            </article>
          `).join("")}
        </div>
      `);
    }
    if (presetRetireCandidates.length) {
      sections.push(`
        <div class="analysis-stack">
          <h4>뒤로 둘 preset</h4>
          ${presetRetireCandidates.map((item) => `
            <article class="analysis-card caution">
              <strong>${escapeHtml(item.preset_label || item.preset_name)}</strong>
              <p>${escapeHtml(item.reason || "표본이 적거나 성과가 약해 기본 추천 preset에서는 한 단계 뒤로 두는 편이 좋아 보입니다.")}</p>
              <div class="chips">
                <span class="chip">사용 ${escapeHtml(numberOrZero(item.usage_count).toFixed(0))}회</span>
                <span class="chip">평균 수익률 ${escapeHtml(formatPct(item.avg_pnl_pct || 0))}</span>
                <span class="chip">false positive ${escapeHtml(numberOrZero(item.false_positive_ratio).toFixed(1))}%</span>
              </div>
            </article>
          `).join("")}
        </div>
      `);
    }
    el.historyPresetStructure.innerHTML = sections.length
      ? sections.join("")
      : '<div class="empty">아직은 preset을 합치거나 나눌 만큼 차이가 충분히 쌓이지 않았습니다.</div>';
  }

  if (el.historyPresetStability) {
    const stableRows = presetStabilityRows.filter((row) => row.stability_label === "stable_performer").slice(0, 3);
    const cautionRows = presetStabilityRows.filter((row) => ["unstable", "retire_watch", "insufficient_data"].includes(row.stability_label)).slice(0, 4);
    const structureRows = [
      ...presetMergeCandidates.slice(0, 2).map((item) => ({
        title: `${item.left_preset_label || item.left_preset_name} + ${item.right_preset_label || item.right_preset_name}`,
        note: item.reason || "성과 차이가 작아 합치기 후보로 보는 편이 좋습니다.",
        confidence: item.confidence,
        confidenceLabel: item.confidence_label,
        sampleSize: item.sample_size,
      })),
      ...presetSplitCandidates.slice(0, 2).map((item) => ({
        title: item.preset_label || item.preset_name,
        note: item.reason || "장세별 성과 차이가 커 분화 검토 대상으로 보입니다.",
        confidence: item.confidence,
        confidenceLabel: item.confidence_label,
        sampleSize: item.sample_size,
      })),
    ].slice(0, 3);
    el.historyPresetStability.innerHTML = `
      <div class="analysis-stack">
        <h4>안정적인 preset</h4>
        ${stableRows.length ? stableRows.map((row) => `
          <article class="analysis-card buy">
            <strong>${escapeHtml(row.preset_label || row.preset_name)}</strong>
            <p>${escapeHtml(row.note || "누적 기준으로 비교적 안정적인 흐름을 보였습니다.")}</p>
            <div class="chips">
              <span class="chip ${escapeHtml(confidenceTone(row.confidence))}">${escapeHtml(confidenceLabelText(row.confidence, row.confidence_label))}</span>
              <span class="chip">표본 ${escapeHtml(numberOrZero(row.usage_count).toFixed(0))}세션</span>
              <span class="chip">평균 ${escapeHtml(formatPct(row.avg_pnl_pct || 0))}</span>
            </div>
          </article>
        `).join("") : '<div class="empty">아직 안정적인 preset으로 보기엔 표본이 부족합니다.</div>'}
      </div>
      <div class="analysis-stack">
        <h4>주의가 필요한 preset</h4>
        ${cautionRows.length ? cautionRows.map((row) => `
          <article class="analysis-card caution">
            <strong>${escapeHtml(row.preset_label || row.preset_name)}</strong>
            <p>${escapeHtml(row.note || "최근과 누적 차이가 커 보수적으로 보는 편이 좋습니다.")}</p>
            <div class="chips">
              <span class="chip ${escapeHtml(confidenceTone(row.confidence))}">${escapeHtml(confidenceLabelText(row.confidence, row.confidence_label))}</span>
              <span class="chip">${escapeHtml(row.stability_label_text || row.stability_label || "상태 확인 중")}</span>
              <span class="chip">표본 ${escapeHtml(numberOrZero(row.usage_count).toFixed(0))}세션</span>
            </div>
          </article>
        `).join("") : '<div class="empty">누적 데이터 기준 주의 preset 표시는 아직 충분하지 않습니다.</div>'}
      </div>
      <div class="analysis-stack">
        <h4>preset 구조 추천 신뢰도</h4>
        ${structureRows.length ? structureRows.map((row) => `
          <article class="analysis-card info">
            <strong>${escapeHtml(row.title || "-")}</strong>
            <p>${escapeHtml(row.note || "")}</p>
            <div class="chips">
              <span class="chip ${escapeHtml(confidenceTone(row.confidence))}">${escapeHtml(confidenceLabelText(row.confidence, row.confidenceLabel))}</span>
              <span class="chip">표본 ${escapeHtml(numberOrZero(row.sampleSize).toFixed(0))}세션</span>
            </div>
          </article>
        `).join("") : '<div class="empty">merge/split 후보도 표본이 더 쌓이면 더 또렷하게 보입니다.</div>'}
      </div>
    `;
  }

  if (el.historyOptimizationWarnings) {
    el.historyOptimizationWarnings.innerHTML = optimizationWarnings.length
      ? `
        <div class="analysis-stack">
          ${optimizationWarnings.map((item) => `
            <article class="analysis-card ${escapeHtml(item.level === "high" ? "danger" : item.level === "medium" ? "warn" : "info")}">
              <strong>${escapeHtml(item.title || "과최적화 경고")}</strong>
              <p>${escapeHtml(item.note || "지금은 설정을 바로 바꾸기보다 누적 데이터를 함께 보는 편이 좋습니다.")}</p>
            </article>
          `).join("")}
        </div>
      `
      : '<div class="empty">현재 누적 리뷰 기준으로는 과최적화 경고가 크게 잡히지 않았습니다.</div>';
  }

  if (el.historyPatternCards) {
    const groups = [
      { title: "잘 맞은 초기 후보", rows: candidateBestPatterns.slice(0, 3), tone: "info" },
      { title: "주의할 초기 후보", rows: candidateCautionPatterns.slice(0, 3), tone: "warn" },
      { title: "잘 맞은 확정 신호", rows: signalBestPatterns.slice(0, 3), tone: "buy" },
      { title: "주의할 확정 신호", rows: signalCautionPatterns.slice(0, 3), tone: "danger" },
    ];
    el.historyPatternCards.innerHTML = groups.map((group) => `
      <div class="analysis-stack">
        <h4>${escapeHtml(group.title)}</h4>
        ${group.rows.length ? group.rows.map((row) => `
          <article class="analysis-card ${escapeHtml(group.tone)}">
            <strong>${escapeHtml(row.label || "-")}</strong>
            <p>${escapeHtml(`${group.title.includes("주의") ? "이 장세에서는 추격 부담이나 false positive가 상대적으로 컸습니다." : "이 장세에서는 전환율과 결과가 비교적 안정적이었습니다."}`)}</p>
            <div class="chips">
              <span class="chip">표본 ${escapeHtml(numberOrZero(row.count).toFixed(0))}건</span>
              <span class="chip">승률 ${escapeHtml(numberOrZero(row.win_rate).toFixed(1))}%</span>
              <span class="chip">평균 수익률 ${escapeHtml(formatPct(row.avg_pnl_pct || 0))}</span>
            </div>
          </article>
        `).join("") : '<div class="empty">패턴 비교에 필요한 표본이 아직 적습니다.</div>'}
      </div>
    `).join("")
      + `
        <div class="analysis-stack">
          <h4>전환이 좋았던 패턴</h4>
          ${bestConversionPatterns.length ? bestConversionPatterns.slice(0, 4).map((row) => `
            <article class="analysis-card">
              <strong>${escapeHtml(row.label || "-")} <span class="muted">(${escapeHtml(row.category === "signal" ? "확정 신호" : "초기 후보")})</span></strong>
              <p>${escapeHtml(row.note || "이 장세에서 상대적으로 안정적인 패턴으로 보였습니다.")}</p>
            </article>
          `).join("") : '<div class="empty">전환 우수 패턴 데이터가 아직 충분하지 않습니다.</div>'}
        </div>
        <div class="analysis-stack">
          <h4>false positive가 많았던 패턴</h4>
          ${worstFalsePositivePatterns.length ? worstFalsePositivePatterns.slice(0, 4).map((row) => `
            <article class="analysis-card caution">
              <strong>${escapeHtml(row.label || "-")} <span class="muted">(${escapeHtml(row.category === "signal" ? "확정 신호" : "초기 후보")})</span></strong>
              <p>${escapeHtml(row.note || "이 장세에서는 노이즈나 추격 부담이 커 보였습니다.")}</p>
            </article>
          `).join("") : '<div class="empty">false positive 패턴 비교 데이터가 아직 충분하지 않습니다.</div>'}
        </div>
      `;
  }

  if (el.historyRegimeStability) {
    el.historyRegimeStability.innerHTML = `
      <div class="history-summary-grid">
        <article class="list-card">
          <strong>장세 안정도</strong>
          <span>${escapeHtml(`${numberOrZero(sessionSummary.regime_stability_score).toFixed(1)} / ${sessionSummary.regime_stability_label || "확인 중"}`)}</span>
          <p>${escapeHtml(sessionSummary.regime_stability_note || "장세 안정도는 장중 장세 전환 횟수와 이후 follow-through를 함께 반영합니다.")}</p>
        </article>
        <article class="list-card">
          <strong>장세 전환 횟수</strong>
          <span>${escapeHtml(`${numberOrZero(sessionSummary.regime_shift_count).toFixed(0)}회`)}</span>
          <p>${escapeHtml(`의미 있는 전환 비율 ${numberOrZero(sessionSummary.meaningful_regime_shift_rate).toFixed(1)}%`)}</p>
        </article>
        <article class="list-card">
          <strong>추천 preset 검토</strong>
          <span>${escapeHtml(sessionSummary.recommended_preset_hit_label || "자료 부족")}</span>
          <p>${escapeHtml(sessionSummary.recommended_preset_hit_reason || "장세 추천 preset이 실제 상위권인지 세션 기록으로 다시 확인합니다.")}</p>
        </article>
        <article class="list-card">
          <strong>실사용 vs 추천</strong>
          <span>${escapeHtml(`${numberOrZero(sessionSummary.actual_vs_recommended_gap).toFixed(1)}점`)}</span>
          <p>${escapeHtml(actualVsRecommended.note || "실제 사용 preset과 장세 추천 preset의 차이를 설명형으로 비교합니다.")}</p>
        </article>
      </div>
      <div class="analysis-list">
        ${regimeShiftEvents.length ? regimeShiftEvents.map((row) => `
          <article class="analysis-card ${row.meaningful ? "info" : "caution"}">
            <strong>${escapeHtml(formatDateTime(row.event_time))}</strong>
            <p>${escapeHtml(row.summary || "장세 해석이 갱신됐습니다.")}</p>
            <div class="chips">
              <span class="chip">후속 이벤트 ${escapeHtml(numberOrZero(row.follow_through_events).toFixed(0))}건</span>
              <span class="chip">확정 신호 ${escapeHtml(numberOrZero(row.confirmed_events).toFixed(0))}건</span>
              <span class="chip">${escapeHtml(row.meaningful ? "의미 있는 전환" : "노이즈 가능성")}</span>
            </div>
          </article>
        `).join("") : '<div class="empty">오늘 세션에서는 장세 전환 이벤트가 아직 없습니다.</div>'}
      </div>
    `;
  }

  el.historyRecommendationList.innerHTML = recommendedAdjustments.length
    ? recommendedAdjustments.map((item) => {
      const metricChips = Object.entries(item.metrics || {}).map(([metricKey, metricValue]) => `
        <span class="chip">${escapeHtml(recommendationMetricLabel(metricKey))} ${escapeHtml(formatRecommendationMetric(metricKey, metricValue))}</span>
      `).join("");
      let fillButton = `<button class="ghost recommendation-action" type="button" data-tab-target="settings">설정 탭에서 확인</button>`;
      if (item.field && item.field !== "preset_review") {
        fillButton = `<button class="secondary recommendation-action" type="button" data-recommend-field="${escapeHtml(item.field)}" data-recommend-value="${escapeHtml(String(item.recommended_value ?? ""))}">입력값에 채우기</button>`;
      } else if (item.field === "preset_review" && presetByName(item.recommended_value)) {
        fillButton = `<button class="secondary recommendation-action" type="button" data-recommend-preset="${escapeHtml(String(item.recommended_value ?? ""))}">추천 preset 초안 채우기</button>`;
      }
      return `
        <article class="recommendation-card">
          <div class="signal-head">
            <div>
              <h3>${escapeHtml(recommendationFieldLabel(item.field))}</h3>
              <div class="signal-meta">현재 ${escapeHtml(recommendationValueText(item.field, item.current_value))} -> 추천 ${escapeHtml(recommendationValueText(item.field, item.recommended_value))}</div>
            </div>
            <div class="button-row">
              ${fillButton}
            </div>
          </div>
          <p class="signal-summary">${escapeHtml(item.reason || "오늘 세션 결과를 바탕으로 다음 운영에서 검토해 볼 만한 조정 제안입니다.")}</p>
          <div class="signal-tags">${metricChips}</div>
        </article>
      `;
    }).join("")
    : '<div class="empty">오늘 세션 기준으로는 아직 자동 조정 제안이 없습니다. 지금 기준을 그대로 유지해도 괜찮습니다.</div>';

  const qualityCards = [
    {
      label: "품질 상위군 전환율",
      value: `${numberOrZero(qualityValidation.top_quality_conversion_rate).toFixed(1)}%`,
      note: "후보 품질 상위 구간이 실제 확정 신호로 얼마나 이어졌는지 보여줍니다.",
    },
    {
      label: "품질 하위군 false positive",
      value: `${numberOrZero(qualityValidation.low_quality_false_positive_ratio).toFixed(1)}%`,
      note: "품질 점수가 낮은 후보가 실제로 불안정한 후보였는지 다시 확인합니다.",
    },
    {
      label: "세션 이벤트 수",
      value: String(eventSummary.reduce((sum, item) => sum + numberOrZero(item.count), 0)),
      note: "후보 생성, 승격, 신호, 설정 변경, 오류 등 세션 단위 이벤트 총량입니다.",
    },
    {
      label: "검증 모드",
      value: sessionSummary.validation_mode_enabled ? "활성" : "기본 운영",
      note: sessionSummary.validation_mode_enabled
        ? "실시장 검증용 로그가 더 자세하게 쌓이고 있습니다."
        : "기본 운영 기준 로그만 쌓이고 있습니다.",
    },
  ];

  const qualityChips = [
    ...safeArray(qualityValidation.quality_vs_outcome).slice(0, 3).map((item) => `품질 ${item.label} ${item.count}건 / 승률 ${numberOrZero(item.win_rate).toFixed(1)}%`),
    ...safeArray(qualityValidation.quality_vs_lead_time).slice(0, 2).map((item) => `품질 ${item.label} 평균 ${numberOrZero(item.avg_pnl_pct).toFixed(1)}분`),
    ...eventSummary.slice(0, 3).map((item) => `${sessionEventLabel(item.label)} ${item.count}건`),
  ];
  el.historyQualityCards.innerHTML = `
    <div class="history-summary-grid">
      ${qualityCards.map((item) => `
        <article class="list-card">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.value)}</span>
          <p>${escapeHtml(item.note)}</p>
        </article>
      `).join("")}
    </div>
    <div class="chips">${qualityChips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("")}</div>
  `;

  el.historyTimelineList.innerHTML = timelineRows.length
    ? timelineRows.map((row) => {
      const detail = detailFromRow(row);
      const timelineKey = row.event_id || row.signal_id || row.position_id || row.candidate_id || row.code;
      const tags = [
        row.preset_label || row.preset_name || "",
        row.candidate_type || "",
        row.signal_type || "",
        row.outcome_label || "",
      ].filter(Boolean).slice(0, 4);
      return `
        <article class="timeline-item">
          <div class="timeline-time">${escapeHtml(formatDateTime(row.event_time || row.created_at))}</div>
          <div class="timeline-body">
            <strong>${escapeHtml(sessionEventLabel(row.event_type))}</strong>
            <p>${escapeHtml(row.summary || detail.signal_summary || "세션 흐름을 복기하기 좋도록 이벤트가 기록돼 있습니다.")}</p>
            <div class="chips">
              <span class="chip">${escapeHtml(row.name || row.code || "시장 이벤트")}</span>
              ${tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}
              ${numberOrZero(row.candidate_quality_score) > 0 ? `<span class="chip">품질 ${escapeHtml(numberOrZero(row.candidate_quality_score).toFixed(1))}</span>` : ""}
              ${numberOrZero(row.signal_score) > 0 ? `<span class="chip">신호점수 ${escapeHtml(numberOrZero(row.signal_score).toFixed(1))}</span>` : ""}
            </div>
          </div>
          <div class="button-row">
            <button class="ghost" data-detail-id="${escapeHtml(timelineKey)}" type="button">자세히</button>
          </div>
        </article>
      `;
    }).join("")
    : '<div class="empty">세션 타임라인이 아직 없습니다. 장중 이벤트가 쌓이면 여기에서 하루 흐름을 시간순으로 복기할 수 있습니다.</div>';
}

function subscribeTable(tableKey, onChange) {
  return state.client.channel(`rt-${tableName(tableKey)}`)
    .on("postgres_changes", { event: "*", schema: "public", table: tableName(tableKey) }, onChange)
    .subscribe();
}

async function initialLoad() {
  await Promise.all([fetchPresets(), fetchSettings(), fetchStatus()]);
  await Promise.all([
    fetchBuySignals(),
    fetchSellSignals(),
    fetchOverviewRows(),
    fetchEarlyDetectionRows(),
    fetchFocusedRows(),
    fetchHistoryRows(),
    fetchDiagnostics(),
    fetchValidationEvents(),
    fetchSessionReport(),
  ]);
  upsertDetailIndex([
    ...state.buySignals,
    ...state.sellSignals,
    ...state.overviewRows,
    ...state.earlyDetectionRows,
    ...state.focusedRows,
    ...state.historyRows,
  ]);
  render();
}

async function bootstrap() {
  const url = String(state.config.supabaseUrl || "").trim();
  const key = String(state.config.supabaseAnonKey || "").trim();
  if (!url || !key || url.includes("YOUR")) {
    el.setupNote.textContent = "public-config.js 안에 Supabase URL과 anon key를 넣어야 공개 URL에서 바로 동작합니다.";
    return;
  }

  const { createClient } = window.supabase;
  state.client = createClient(url, key, { realtime: { params: { eventsPerSecond: 10 } } });

  try {
    await initialLoad();
    subscribeTable("appStatus", () => scheduleRefresh("status", async () => {
      await Promise.all([fetchStatus(), fetchOverviewRows(), fetchDiagnostics(), fetchValidationEvents(), fetchSessionReport()]);
    }, render));
    subscribeTable("buySignals", () => scheduleRefresh("buy", async () => { await fetchBuySignals(); }, render));
    subscribeTable("sellSignals", () => scheduleRefresh("sell", async () => { await fetchSellSignals(); }, render));
    subscribeTable("risingSectorRows", () => scheduleRefresh("overview-live", async () => {
      if (state.status?.market_open) await fetchOverviewRows();
    }, render));
    subscribeTable("earlyDetectionRows", () => scheduleRefresh("early-detection", async () => {
      await fetchEarlyDetectionRows();
    }, render));
    subscribeTable("focusedWatchlistState", () => scheduleRefresh("focused-watch", async () => {
      await fetchFocusedRows();
    }, render));
    subscribeTable("lastMarket", () => scheduleRefresh("overview-last-market", async () => {
      if (!state.status?.market_open) await fetchOverviewRows();
    }, render));
    subscribeTable("tradeHistory", () => scheduleRefresh("history", async () => {
      await Promise.all([fetchHistoryRows(), fetchSessionReport()]);
    }, render));
    subscribeTable("signalSettings", () => scheduleRefresh("settings", async () => {
      await Promise.all([fetchSettings(), fetchStatus(), fetchDiagnostics()]);
    }, render));
    subscribeTable("signalPresets", () => scheduleRefresh("presets", async () => {
      await Promise.all([fetchPresets(), fetchSettings(), fetchStatus()]);
    }, render));
    subscribeTable("runtimeDiagnostics", () => scheduleRefresh("diagnostics", async () => { await fetchDiagnostics(); }, render));
    subscribeTable("validationEvents", () => scheduleRefresh("validation", async () => { await fetchValidationEvents(); }, render));
    subscribeTable("sessionReports", () => scheduleRefresh("session-report", async () => { await fetchSessionReport(); }, render));
  } catch (error) {
    console.error(error);
    el.setupNote.textContent = `Supabase 연결 중 오류가 발생했습니다. ${error.message || error}`;
  }
}

function wireEvents() {
  el.tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tabButton));
  });

  el.historyButton.addEventListener("click", () => {
    activateTab("history");
    document.querySelector('[data-tab-panel="history"]')?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  el.settingsButton.addEventListener("click", () => {
    activateTab("settings");
    el.settingsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  el.saveSettingsButton.addEventListener("click", async () => {
    try {
      await saveSettingsRow(
        collectSettingsRow({
          changedSource: "public-ui",
          changeReason: "manual-save",
          note: "공개 페이지에서 기준을 수동으로 조정했습니다.",
          autoEnabled: el.autoPresetEnabled.checked,
        }),
        "설정을 저장했습니다.",
      );
    } catch (error) {
      console.error(error);
      setSettingsFlash("error", `설정 저장에 실패했습니다. ${error.message || error}`);
    }
  });

  el.enableAutoButton.addEventListener("click", async () => {
    try {
      await applyPreset(state.status?.active_preset_name || el.selectedPresetName.value || state.presetRows[0]?.preset_name, true);
    } catch (error) {
      console.error(error);
      setSettingsFlash("error", `자동 추천 적용에 실패했습니다. ${error.message || error}`);
    }
  });

  el.historySort.addEventListener("change", () => { state.historySort = el.historySort.value; renderHistory(); });
  el.historyStatusFilter.addEventListener("change", () => { state.historyStatusFilter = el.historyStatusFilter.value; renderHistory(); });
  el.historySignalFilter.addEventListener("change", () => { state.historySignalFilter = el.historySignalFilter.value; renderHistory(); });
  el.historyPresetFilter.addEventListener("change", () => { state.historyPresetFilter = el.historyPresetFilter.value; renderHistory(); });
  el.historyDateFilter.addEventListener("change", () => { state.historyDateFilter = el.historyDateFilter.value; renderHistory(); });
  el.historySectorFilter.addEventListener("change", () => { state.historySectorFilter = el.historySectorFilter.value; renderHistory(); });
  el.historySymbolQuery.addEventListener("input", () => { state.historySymbolQuery = el.historySymbolQuery.value; renderHistory(); });

  document.addEventListener("click", async (event) => {
    const detailButton = event.target.closest("[data-detail-id]");
    if (detailButton) openDetailV2(detailButton.getAttribute("data-detail-id"));

    const closeTarget = event.target.getAttribute("data-close");
    if (closeTarget === "detail") closeDetail();

    const presetButton = event.target.closest("[data-preset]");
    if (presetButton) {
      try {
        await applyPreset(presetButton.getAttribute("data-preset"), false);
      } catch (error) {
        console.error(error);
        setSettingsFlash("error", `추천값 적용에 실패했습니다. ${error.message || error}`);
      }
    }

    const recommendButton = event.target.closest("[data-recommend-field]");
    if (recommendButton) {
      applyRecommendationDraft(
        recommendButton.getAttribute("data-recommend-field"),
        recommendButton.getAttribute("data-recommend-value"),
      );
    }

    const recommendPresetButton = event.target.closest("[data-recommend-preset]");
    if (recommendPresetButton) {
      applyPresetDraft(recommendPresetButton.getAttribute("data-recommend-preset"));
    }

    const tabTargetButton = event.target.closest("[data-tab-target]");
    if (tabTargetButton) {
      activateTab(tabTargetButton.getAttribute("data-tab-target"));
    }
  });
}

const STRICT_REALTIME_ROW_STALE_SECONDS = 180;
const STRICT_LIVE_FRESHNESS_SECONDS = 150;

function isFreshRealtimeRowStrict(row) {
  const timestamp = rowActivityTime(row);
  if (!timestamp) return true;
  return secondsSince(timestamp) <= STRICT_REALTIME_ROW_STALE_SECONDS;
}

function hasUsableLiveStatus(status) {
  if (!status) return false;
  const liveState = String(status.live_state || "").toLowerCase();
  const freshness = numberOrZero(status.live_data_freshness_seconds);
  if (liveState === "ok") return true;
  if (liveState === "delayed" && freshness <= STRICT_LIVE_FRESHNESS_SECONDS) return true;
  if (status.live_last_tick_at && freshness <= STRICT_LIVE_FRESHNESS_SECONDS) return true;
  return false;
}

function summarizeErrorMessage(message, code = "") {
  const raw = String(message || "").replace(/\s+/g, " ").trim();
  const shortCode = String(code || "").trim();
  if (!raw) {
    return {
      label: shortCode || "최근 오류 있음",
      short: "최근 오류가 감지되었습니다.",
      detail: "",
    };
  }
  const source = `${shortCode} ${raw}`;
  if (/521|web server is down/i.test(source)) {
    return { label: shortCode || "521", short: "521 Web server is down", detail: raw };
  }
  if (/502|bad gateway/i.test(source)) {
    return { label: shortCode || "502", short: "502 Bad gateway", detail: raw };
  }
  if (/timed out|timeout/i.test(raw)) {
    return { label: shortCode || "timeout", short: "Read timed out", detail: raw };
  }
  if (/connection aborted|econnreset|connection reset/i.test(raw)) {
    return { label: shortCode || "aborted", short: "Connection aborted", detail: raw };
  }
  if (/<html|<!doctype html|cloudflare/i.test(raw)) {
    return {
      label: shortCode || "HTML 오류 응답",
      short: shortCode ? `${shortCode} HTML 응답` : "HTML 오류 응답",
      detail: raw,
    };
  }
  return {
    label: shortCode || "최근 오류 있음",
    short: raw.length > 96 ? `${raw.slice(0, 96)}…` : raw,
    detail: raw,
  };
}

function diagnosticSummary(row) {
  const details = parseMaybeJson(row?.details, {});
  const code = row?.code || details?.code || details?.error_type || row?.status_code || "";
  const message = row?.message || details?.short_message || details?.message || details?.error || row?.summary || "";
  return summarizeErrorMessage(message, code);
}

function diagnosticMessageMarkup(row) {
  const summary = diagnosticSummary(row);
  const showDetail = summary.detail && summary.detail !== summary.short;
  return `
    <p>${escapeHtml(summary.short || "상세 메시지가 없습니다.")}</p>
    ${showDetail ? `
      <details class="diagnostic-detail">
        <summary>자세히 보기</summary>
        <pre>${escapeHtml(summary.detail)}</pre>
      </details>
    ` : ""}
  `;
}

function currentLiveCollections() {
  const buyRows = (state.buySignals || []).filter(isFreshRealtimeRowStrict);
  const sellRows = (state.sellSignals || []).filter(isFreshRealtimeRowStrict);
  const earlyRows = (state.earlyDetectionRows || []).filter(isFreshRealtimeRowStrict);
  const focusedRows = (state.focusedRows || []).filter(isFreshRealtimeRowStrict);
  const liveRowCount = buyRows.length + sellRows.length + earlyRows.length + focusedRows.length;
  const status = state.status || {};
  const baseMode = status.dashboard_source_mode || (status.market_open ? "fallback" : "last_market");
  const liveHealthy = hasUsableLiveStatus(status);
  const heartbeatFresh = secondsSince(status.producer_heartbeat_at || status.updated_at) <= 60;
  let effectiveMode = baseMode;
  if (baseMode === "live" && liveHealthy) {
    effectiveMode = "live";
  } else if (status.market_open && liveRowCount > 0 && liveHealthy) {
    effectiveMode = "partial_live";
  } else if (status.market_open && liveRowCount > 0 && heartbeatFresh) {
    effectiveMode = "recovering";
  } else if (status.market_open) {
    effectiveMode = "fallback";
  } else {
    effectiveMode = "last_market";
  }
  return { buyRows, sellRows, earlyRows, focusedRows, liveRowCount, liveHealthy, effectiveMode };
}

function sourceModeStatus(status) {
  return effectiveSourceModeStatus(status);
}

function effectiveSourceModeStatus(status) {
  const collections = currentLiveCollections();
  const mode = collections.effectiveMode || status.dashboard_source_mode || "last_market";
  const liveState = String(status.live_state || "stopped").toLowerCase();
  if (mode === "live" && liveState === "ok") {
    return { label: "live 정상", tone: "ok", note: "실시간 데이터가 정상적으로 들어오고 있습니다." };
  }
  if (mode === "live" && liveState === "delayed") {
    return { label: "live 지연", tone: "pending", note: "최근 틱 수신이 조금 늦지만 실시간 흐름은 유지되고 있습니다." };
  }
  if (mode === "partial_live") {
    return { label: "partial live", tone: "pending", note: "실시간 후보 또는 신호 일부가 유지되고 있어 live 흐름과 overview를 함께 보여주고 있습니다." };
  }
  if (mode === "recovering") {
    return { label: "recovering", tone: "warn", note: "최근 row는 남아 있지만 live tick이 충분히 새롭지 않아 복구 중으로 보고 있습니다." };
  }
  if (mode === "fallback") {
    return { label: "snapshot fallback", tone: "warn", note: status.fallback_reason || "현재는 snapshot fallback 기준 데이터로 화면을 유지하고 있습니다." };
  }
  if (mode === "last_market") {
    return { label: "last_market", tone: "info", note: "현재는 마지막 시장 기준 데이터를 보여주고 있습니다." };
  }
  if (liveState === "stale") {
    return { label: "live stale", tone: "warn", note: "실시간 데이터가 멈춰 마지막 값을 유지하고 있습니다." };
  }
  return { label: "확인 중", tone: "info", note: "실시간 상태를 확인하는 중입니다." };
}

function heartbeatStatus(status) {
  const age = secondsSince(status.producer_heartbeat_at || status.updated_at);
  if (!status.producer_heartbeat_at && !status.updated_at) {
    return { label: "producer 미시작", tone: "warn", note: "producer가 아직 시작되지 않았습니다." };
  }
  if (age <= 15) return { label: "정상", tone: "ok", note: `최근 ${age}초 전에 heartbeat가 갱신됐습니다.` };
  if (age <= 45) return { label: "지연", tone: "pending", note: `최근 ${age}초 전에 heartbeat가 들어왔습니다.` };
  return { label: "멈춤 의심", tone: "error", note: `${age}초 동안 heartbeat가 갱신되지 않았습니다.` };
}

function settingsReflectionStatus(status) {
  const savedAt = status.last_settings_save_at || state.settingsRow?.updated_at || "";
  const appliedAt = status.signal_settings_applied_at || "";
  if (state.settingsFetchState?.status === "stale-keep") {
    return {
      label: "마지막 성공 상태 유지",
      tone: "warn",
      note: state.settingsFetchState.note || "설정 읽기 실패로 마지막 성공 상태를 유지합니다.",
    };
  }
  if (!savedAt) return { label: "확인 중", tone: "info", note: "아직 저장된 설정 시각을 받지 못했습니다." };
  if (!appliedAt) return { label: "반영 대기", tone: "pending", note: `저장 ${formatDateTime(savedAt)} / 러너가 새 기준을 다시 읽는 중입니다.` };
  const savedMs = new Date(savedAt).getTime();
  const appliedMs = new Date(appliedAt).getTime();
  if (!Number.isNaN(savedMs) && !Number.isNaN(appliedMs) && appliedMs >= savedMs - 1000) {
    const autoEnabled = Boolean(status.auto_preset_enabled ?? state.settingsRow?.auto_preset_enabled);
    return {
      label: autoEnabled ? "자동추천 반영 완료" : "수동 설정 유지 중",
      tone: "ok",
      note: autoEnabled
        ? `저장 ${formatDateTime(savedAt)} / 적용 ${formatDateTime(appliedAt)} / 자동추천이 현재 기준을 덮어쓰는 중입니다.`
        : `저장 ${formatDateTime(savedAt)} / 적용 ${formatDateTime(appliedAt)} / 수동으로 저장한 값을 유지하고 있습니다.`,
    };
  }
  return { label: "반영 대기", tone: "pending", note: `저장 ${formatDateTime(savedAt)} / 마지막 적용 ${formatDateTime(appliedAt)}` };
}

function diagnosticsStatus(status) {
  if (status.app_status_sync_state && status.app_status_sync_state !== "ok") {
    return {
      label: "운영 상태 동기화 지연",
      tone: "warn",
      note: status.app_status_sync_short_message
        ? `최근 상태 반영이 지연될 수 있습니다. ${status.app_status_sync_short_message}`
        : "최근 상태 반영이 지연될 수 있습니다.",
      detail: status.app_status_last_failure_at
        ? `마지막 실패 ${formatDateTime(status.app_status_last_failure_at)} / backoff ${numberOrZero(status.app_status_sync_backoff_seconds).toFixed(1)}초`
        : "",
    };
  }
  if (!status.settings_table_available) {
    return { label: "signal_settings 미구성", tone: "warn", note: "signal_settings 테이블이 아직 없어 기본 설정으로 동작 중입니다." };
  }
  if (!status.presets_table_available) {
    return { label: "preset fallback 사용 중", tone: "warn", note: "signal_presets가 없어 내장 추천값을 사용 중입니다." };
  }
  if (status.last_error_message) {
    const errorInfo = summarizeErrorMessage(status.last_error_message, status.last_error_code);
    return {
      label: errorInfo.label || "최근 오류 있음",
      tone: "error",
      note: errorInfo.short,
      detail: errorInfo.detail,
    };
  }
  return { label: "최근 오류 없음", tone: "ok", note: "최근 진단 항목에서 치명적인 오류를 받지 않았습니다." };
}

function historyAnalytics(rows) {
  const closed = rows.filter((row) => row.status === "CLOSED");
  const wins = closed.filter((row) => numberOrZero(row.realized_pnl_pct) > 0);
  const openRows = rows.filter((row) => row.status === "OPEN");
  const sessionSummary = parseMaybeJson(state.sessionReport?.summary, {});
  const overall = sessionSummary.overall || {};
  const candidateSummary = sessionSummary.candidate_summary || {};
  const detectionSummary = safeArray(sessionSummary.by_detection_type);
  const conversionSummary = safeArray(sessionSummary.by_conversion);
  const avgClosedPnl = closed.length ? closed.reduce((sum, row) => sum + numberOrZero(row.realized_pnl_pct), 0) / closed.length : 0;
  const avgHolding = rows.length ? rows.reduce((sum, row) => sum + numberOrZero(row.holding_seconds), 0) / rows.length : 0;
  const winRate = closed.length ? (wins.length / closed.length) * 100 : 0;

  return {
    cards: [
      { label: "오늘 매수 신호", value: String(sessionSummary.today_buy_signals ?? state.buySignals.length), note: "오늘 발생한 매수 이벤트 수입니다." },
      { label: "오늘 매도 신호", value: String(sessionSummary.today_sell_signals ?? state.sellSignals.length), note: "오늘 발생한 매도 이벤트 수입니다." },
      { label: "종료 거래", value: String(overall.closed_count ?? closed.length), note: `진행 중 ${overall.open_count ?? openRows.length}건` },
      { label: "평균 수익률", value: `${numberOrZero(overall.avg_pnl_pct ?? avgClosedPnl).toFixed(2)}%`, note: `승률 ${numberOrZero(overall.win_rate ?? winRate).toFixed(1)}%` },
      { label: "초기 포착", value: String(candidateSummary.early_detection_count ?? 0), note: "전체 유니버스 탐지층에서 먼저 포착한 후보 수입니다." },
      { label: "후보 승격", value: String(candidateSummary.promotion_count ?? 0), note: "집중 실시간 감시 대상으로 승격된 후보 수입니다." },
      {
        label: "후보→신호 전환",
        value: `${numberOrZero(candidateSummary.candidate_to_signal_conversion_rate).toFixed(1)}%`,
        note: `평균 ${numberOrZero(candidateSummary.avg_minutes_to_signal).toFixed(1)}분 안에 확정 신호로 이어졌습니다.`,
      },
    ],
    chips: [
      `기록 ${rows.length}건`,
      `종료 ${closed.length}건`,
      `진행 중 ${openRows.length}건`,
      `평균 보유 ${rows.length ? formatHolding(avgHolding) : "-"}`,
      `평균 수익률 ${closed.length ? avgClosedPnl.toFixed(2) : "0.00"}%`,
      `초기 포착 ${candidateSummary.early_detection_count ?? 0}건`,
      `후보 승격 ${candidateSummary.promotion_count ?? 0}건`,
      `실패/강등 ${candidateSummary.demotion_count ?? 0}건`,
    ],
    summaries: [
      ...summarizeCounts(closed, (row) => row.buy_signal_type || row.sell_signal_type || "기타", "신호 "),
      ...summarizeCounts(closed, (row) => row.preset_label || row.preset_name || "사용자 설정", "preset "),
      ...summarizeCounts(closed, (row) => row.sector || "기타", "섹터 "),
      ...summarizeCounts(closed, (row) => row.result_status || row.status || "기타", "결과 "),
      ...detectionSummary.slice(0, 2).map((item) => `초기 포착 ${item.label} ${item.count}건`),
      ...conversionSummary.slice(0, 2).map((item) => `전환 ${item.label} ${item.count}건`),
    ].slice(0, 8),
  };
}

function renderEarlyDetection() {
  const liveCollections = currentLiveCollections();
  const earlyRows = [...liveCollections.earlyRows].sort((a, b) =>
    numberOrZero(b.candidate_quality_score) - numberOrZero(a.candidate_quality_score)
    || numberOrZero(b.candidate_score) - numberOrZero(a.candidate_score));
  const focusedRows = [...liveCollections.focusedRows].sort((a, b) =>
    numberOrZero(a.focus_rank || 999) - numberOrZero(b.focus_rank || 999)
    || numberOrZero(b.candidate_quality_score) - numberOrZero(a.candidate_quality_score));
  const candidateSummary = parseMaybeJson(state.sessionReport?.summary, {}).candidate_summary || {};

  upsertDetailIndex([...earlyRows, ...focusedRows]);

  el.earlySummaryCards.innerHTML = [
    {
      label: "초기 포착 후보",
      value: String(earlyRows.length),
      note: "전체 유니버스 탐지층에서 먼저 떠오른 후보 수입니다.",
    },
    {
      label: "집중 감시 종목",
      value: String(focusedRows.length),
      note: "websocket 집중 감시 대상으로 승격된 종목 수입니다.",
    },
    {
      label: "후보→신호 전환",
      value: `${numberOrZero(candidateSummary.candidate_to_signal_conversion_rate).toFixed(1)}%`,
      note: `평균 ${numberOrZero(candidateSummary.avg_minutes_to_signal).toFixed(1)}분 안에 확정 신호로 이어졌습니다.`,
    },
    {
      label: "품질 상위군 전환",
      value: `${numberOrZero(candidateSummary.high_quality_conversion_rate).toFixed(1)}%`,
      note: `false positive ${candidateSummary.false_positive_candidate_count ?? 0}건 / 과열 추격 ${candidateSummary.overextended_candidate_count ?? 0}건`,
    },
  ].map((item) => `
    <article class="list-card">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join("");

  el.focusedSummaryChips.innerHTML = [
    `전체 유니버스 ${state.status?.total_universe_count ?? state.status?.watchlist_count ?? 0}종목`,
    `스캔 진행 ${state.status?.broad_scan_processed_count ?? 0}/${state.status?.total_universe_count ?? state.status?.watchlist_count ?? 0}`,
    `초기 포착 ${earlyRows.length}건`,
    `확정 신호 ${liveCollections.buyRows.length + liveCollections.sellRows.length}건`,
    `false positive ${candidateSummary.false_positive_candidate_count ?? 0}건`,
    `과열 추격 ${numberOrZero(candidateSummary.overextended_candidate_ratio).toFixed(1)}%`,
  ].map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");

  if (!earlyRows.length) {
    el.earlyDetectionList.innerHTML = '<div class="empty">전체 유니버스 탐지층에서 아직 눈에 띄는 초기 포착 후보가 없습니다.</div>';
  } else {
    el.earlyDetectionList.innerHTML = earlyRows.map((row) => {
      const detail = detailFromRow(row);
      const key = row.candidate_id || row.code;
      return `
        <article class="signal-card">
          <div class="signal-head">
            <div>
              <h3>${escapeHtml(row.name)} <span class="muted">${escapeHtml(row.code)}</span></h3>
              <div class="signal-meta">${escapeHtml(row.market || "-")} / ${escapeHtml(row.sector || "섹터 확인 중")} / ${escapeHtml(row.detection_type || detail.signal_type || "-")}</div>
            </div>
            <div class="button-row">
              <span class="tag info">초기 포착</span>
              <button class="ghost" data-detail-id="${escapeHtml(key)}" type="button">자세히</button>
            </div>
          </div>
          <p class="signal-summary">${escapeHtml(row.summary || detail.signal_summary || "막 강도가 붙기 시작한 후보입니다.")}</p>
          <div class="signal-tags">
            <span class="tag">후보점수 ${numberOrZero(row.candidate_score).toFixed(1)}</span>
            <span class="tag buy">품질 ${numberOrZero(row.candidate_quality_score ?? detail.candidate_quality_score).toFixed(1)}</span>
            <span class="tag">${escapeHtml(row.quality_label_text || detail.quality_label_text || "품질 확인 중")}</span>
            <span class="tag">집중점수 ${numberOrZero(row.focus_score).toFixed(1)}</span>
            <span class="tag">RVOL ${numberOrZero(detail.rvol).toFixed(2)}</span>
            <span class="tag">1분 ${formatPct(detail.recent_change_1m_pct)}</span>
            <span class="tag">${numberOrZero(detail.compare_window_minutes).toFixed(0)}분 ${formatPct(detail.recent_change_pct)}</span>
            <span class="tag">turnover ${formatRatioPct(detail.turnover_ratio)}</span>
          </div>
          <div class="signal-tags">
            <span class="tag info">${escapeHtml((safeArray(detail.quality_good_reasons)[0]) || "거래 강도와 가격 흐름을 함께 보며 지켜보는 후보입니다.")}</span>
            ${safeArray(detail.quality_caution_reasons)[0]
              ? `<span class="tag warn">${escapeHtml(safeArray(detail.quality_caution_reasons)[0])}</span>`
              : ""}
            ${numberOrZero(detail.overextension_risk) >= 7
              ? `<span class="tag danger">과열 추격 주의 ${numberOrZero(detail.overextension_risk).toFixed(1)}</span>`
              : ""}
          </div>
        </article>
      `;
    }).join("");
  }

  if (!focusedRows.length) {
    el.focusedWatchList.innerHTML = '<div class="empty">지금은 websocket 집중 감시 대상으로 올라온 종목이 없습니다.</div>';
  } else {
    el.focusedWatchList.innerHTML = focusedRows.map((row) => {
      const detail = detailFromRow(row);
      const key = row.candidate_id || row.code;
      return `
        <article class="signal-card">
          <div class="signal-head">
            <div>
              <h3>${escapeHtml(row.name)} <span class="muted">${escapeHtml(row.code)}</span></h3>
              <div class="signal-meta">${escapeHtml(row.market || "-")} / ${escapeHtml(row.sector || "섹터 확인 중")} / focus rank ${escapeHtml(String(row.focus_rank || "-"))}</div>
            </div>
            <div class="button-row">
              <span class="tag buy">집중 감시</span>
              <button class="ghost" data-detail-id="${escapeHtml(key)}" type="button">자세히</button>
            </div>
          </div>
          <p class="signal-summary">${escapeHtml(row.summary || detail.signal_summary || "실시간 집중 감시 대상으로 올라온 종목입니다.")}</p>
          <div class="signal-tags">
            <span class="tag">품질 ${numberOrZero(row.candidate_quality_score ?? detail.candidate_quality_score).toFixed(1)}</span>
            <span class="tag">집중점수 ${numberOrZero(row.focus_score).toFixed(1)}</span>
            <span class="tag">RVOL ${numberOrZero(detail.rvol).toFixed(2)}</span>
            <span class="tag">${numberOrZero(detail.compare_window_minutes).toFixed(0)}분 ${formatPct(detail.recent_change_pct)}</span>
            <span class="tag">turnover ${formatRatioPct(detail.turnover_ratio)}</span>
          </div>
        </article>
      `;
    }).join("");
  }
}

function renderStatus() {
  const status = state.status || {};
  const sourceInfo = effectiveSourceModeStatus(status);
  const heartbeatInfo = heartbeatStatus(status);
  const settingsInfo = settingsReflectionStatus(status);
  const diagnosticsInfo = diagnosticsStatus(status);
  const liveFreshness = numberOrZero(status.live_data_freshness_seconds);
  const regimeLabel = status.current_market_regime_label || status.current_market_regime || "확인 중";
  const activePresetIsTest = isTestPreset(status.active_preset_name || status.selected_preset_name);
  const liveCollections = currentLiveCollections();

  el.marketStatusLabel.textContent = status.market_phase_label || status.market_status_label || "확인 중";
  el.sourceModeLabel.textContent = sourceInfo.label;
  el.activePresetLabel.textContent = status.active_preset_label || status.selected_preset_label || "확인 중";
  el.settingsAppliedLabel.textContent = settingsInfo.label;
  el.heartbeatLabel.textContent = heartbeatInfo.label;
  el.lastSignalLabel.textContent = formatDateTime(status.last_signal_at);
  el.statusNotice.textContent = sourceInfo.note || status.notice_text || "실시간 상태를 확인하는 중입니다.";

  const hasQuietMobileNotice = !(
    diagnosticsInfo.tone === "error"
    || diagnosticsInfo.tone === "warn"
    || sourceInfo.tone === "warn"
    || sourceInfo.tone === "pending"
    || status.ready_check_status === "fail"
    || status.ready_check_status === "warn"
    || Boolean(status.last_error_code || status.last_error_message)
  );
  el.statusNotice.classList.toggle("is-quiet", hasQuietMobileNotice);

  const topChips = [
    { text: `전체 ${status.total_universe_count || status.watchlist_count || 0}종목`, tone: "info" },
    { text: `후보 ${liveCollections.earlyRows.length}종목`, tone: "pending" },
    { text: `집중 감시 ${liveCollections.focusedRows.length}종목`, tone: "info" },
    { text: `live tick ${status.live_tick_count || 0}`, tone: "info" },
    { text: `freshness ${liveFreshness}초`, tone: sourceInfo.tone },
    { text: `장세 ${regimeLabel}`, tone: regimeTone(status.current_market_regime) },
    { text: `매수 ${liveCollections.buyRows.length}건`, tone: "buy" },
    { text: `매도 ${liveCollections.sellRows.length}건`, tone: "sell" },
    { text: diagnosticsInfo.label, tone: diagnosticsInfo.tone },
  ];
  el.statusChips.innerHTML = topChips
    .map((item) => `<span class="chip ${escapeHtml(item.tone)}">${escapeHtml(item.text)}</span>`)
    .join("");

  if (el.mobileStatusFlags) {
    const mobileFlags = [];
    if (diagnosticsInfo.tone === "error" || diagnosticsInfo.tone === "warn") {
      mobileFlags.push({ text: diagnosticsInfo.label, tone: diagnosticsInfo.tone });
    }
    if (status.ready_check_status === "fail" || status.ready_check_status === "warn") {
      mobileFlags.push({
        text: `ready ${status.ready_check_status}`,
        tone: status.ready_check_status === "fail" ? "error" : "warn",
      });
    }
    if (status.last_error_code || status.last_error_message) {
      mobileFlags.push({ text: "오류 있음", tone: "error" });
    }
    if (status.tape_recording_enabled === false) {
      mobileFlags.push({ text: "tape 기록 꺼짐", tone: "warn" });
    }
    el.mobileStatusFlags.innerHTML = mobileFlags
      .slice(0, 3)
      .map((item) => `<span class="chip ${escapeHtml(item.tone)}">${escapeHtml(item.text)}</span>`)
      .join("");
    el.mobileStatusFlags.hidden = mobileFlags.length === 0;
  }

  if (el.mobileStatusDetailBadge) {
    const hasStatusIssue = diagnosticsInfo.tone === "error"
      || diagnosticsInfo.tone === "warn"
      || status.ready_check_status === "warn"
      || status.ready_check_status === "fail"
      || Boolean(status.last_error_code || status.last_error_message);
    const badgeTone = diagnosticsInfo.tone === "error"
      ? "error"
      : diagnosticsInfo.tone === "warn" || status.ready_check_status === "warn"
        ? "warn"
        : "info";
    const badgeText = diagnosticsInfo.tone === "error"
      ? "오류"
      : diagnosticsInfo.tone === "warn" || status.ready_check_status === "warn"
        ? "경고"
        : "정상";
    el.mobileStatusDetailBadge.className = `chip ${badgeTone}`;
    el.mobileStatusDetailBadge.textContent = badgeText;
    el.mobileStatusDetailBadge.hidden = !hasStatusIssue;
  }

  const detailCards = [
    {
      label: "현재 적용 중인 기준",
      value: status.active_preset_label || "확인 중",
      note: activePresetIsTest
        ? "테스트용 preset 사용 중입니다. 후보와 focused 승격이 넓게 잡혀 false positive가 늘 수 있습니다."
        : status.active_preset_reason || "현재 시간대와 설정에 맞는 기준을 적용하고 있습니다.",
    },
    {
      label: "오늘의 장세",
      value: regimeLabel,
      note: status.regime_summary || "장세를 해석하는 중입니다.",
    },
    {
      label: "실시간 freshness",
      value: `${status.live_state || "stopped"} / ${liveFreshness}초`,
      note: `마지막 live tick ${formatDateTime(status.live_last_tick_at)}`,
    },
    {
      label: "설정 반영 상태",
      value: settingsInfo.label,
      note: settingsInfo.note,
    },
    {
      label: "최근 설정 변경",
      value: changedSourceLabel(status.settings_changed_source || state.settingsRow?.changed_source),
      note: status.settings_change_reason || state.settingsRow?.change_reason || "최근 변경 사유를 아직 받지 못했습니다.",
    },
    {
      label: "마지막 신호",
      value: formatDateTime(status.last_signal_at),
      note: `매수 ${formatDateTime(status.last_buy_signal_at)} / 매도 ${formatDateTime(status.last_sell_signal_at)}`,
    },
    {
      label: "장세 추천 preset",
      value: status.regime_matched_preset_label || "없음",
      note: status.regime_matched_preset_reason || "장세별 추천 preset을 정리하는 중입니다.",
    },
    {
      label: "ready check",
      value: status.ready_check_status || "pending",
      note: (status.ready_check_summary && status.ready_check_summary.summary_line) || "장 시작 전 준비 상태를 점검합니다.",
    },
    {
      label: "tape recording",
      value: status.tape_recording_enabled ? "on" : "off",
      note: `session ${status.tape_session_id || "-"} / rows ${status.recorded_tape_row_count || 0} / last ${formatDateTime(status.last_tape_write_time)}`,
    },
    {
      label: "opening window",
      value: status.opening_window_active ? "active" : "idle",
      note: `candidate ${status.opening_candidate_count || 0} / signal ${status.opening_signal_count || 0} / false positive ${status.opening_false_positive_count || 0}`,
    },
  ];
  const detailMarkup = detailCards.map((item) => `
    <article class="status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
  el.statusDetailGrid.innerHTML = detailMarkup;
  if (el.mobileStatusDetailGrid) el.mobileStatusDetailGrid.innerHTML = detailMarkup;

  const operationsMarkup = [
    { label: "운영 모드", value: sourceInfo.label, note: sourceInfo.note },
    { label: "producer heartbeat", value: heartbeatInfo.label, note: heartbeatInfo.note },
    {
      label: "상태 동기화",
      value: status.app_status_sync_state || "ok",
      note: status.app_status_sync_state && status.app_status_sync_state !== "ok"
        ? `${status.app_status_sync_short_message || "app_status 재시도 중"} / 마지막 성공 ${formatDateTime(status.app_status_last_success_at)}`
        : `마지막 성공 ${formatDateTime(status.app_status_last_success_at)}`,
    },
    {
      label: "broad scan quote",
      value: `${numberOrZero(status.broad_scan_quote_failure_ratio).toFixed(1)}% 실패`,
      note: `성공 ${numberOrZero(status.broad_scan_quote_success_count).toFixed(0)} / 실패 ${numberOrZero(status.broad_scan_quote_failure_count).toFixed(0)}`,
    },
    { label: "상위 섹터 군집", value: status.top_sector_cluster || "확인 중", note: "오늘 장세를 끄는 섹터가 있다면 이 영역에 먼저 나타납니다." },
    { label: "휩쏘 위험", value: numberOrZero(status.current_whipsaw_risk).toFixed(1), note: "값이 높을수록 흔들림이 커 false positive가 늘기 쉬운 환경입니다." },
    { label: "추세 지속성", value: numberOrZero(status.current_trend_persistence).toFixed(1), note: "값이 높을수록 장중 흐름이 오후까지 이어지는 편입니다." },
    { label: "과열 환경", value: numberOrZero(status.current_overextension_environment).toFixed(1), note: "값이 높을수록 늦은 추격형 후보가 늘기 쉬운 환경입니다." },
    { label: "최근 오류", value: diagnosticsInfo.label, note: diagnosticsInfo.note },
    { label: "closeout", value: status.session_bundle_available ? "available" : "pending", note: status.closeout_generated_at ? `generated ${formatDateTime(status.closeout_generated_at)}` : "장마감 후 closeout bundle이 생성되면 여기에 표시됩니다." },
    { label: "monitoring level", value: status.monitoring_level || "normal", note: status.monitoring_level === "monitor" ? "장중 상세 기록 강화 모드입니다." : "일반 운영 기록 모드입니다." },
  ].map((item) => `
    <article class="status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
  el.operationsGrid.innerHTML = operationsMarkup;
  if (el.mobileOperationsGrid) el.mobileOperationsGrid.innerHTML = operationsMarkup;

  const regimeReasons = safeArray(status.market_regime_reasons);
  const notes = [...safeArray(status.runtime_notes), ...regimeReasons, ...Array.from(state.setupNotes)];
  const notesMarkup = notes.length
    ? notes.map((note) => {
      const text = String(note || "");
      const tone = text.includes("오류")
        ? "error"
        : text.includes("fallback") || text.includes("없") || text.includes("대기")
          ? "warn"
          : "";
      return `<div class="note-item ${tone}">${escapeHtml(text)}</div>`;
    }).join("")
    : `<div class="empty">운영 메모가 아직 없습니다.</div>`;
  el.runtimeNotes.innerHTML = notesMarkup;
  if (el.mobileRuntimeNotes) el.mobileRuntimeNotes.innerHTML = notesMarkup;

  renderDiagnosticList(
    el.diagnosticList,
    state.diagnosticsRows,
    "최근 진단 기록이 아직 없습니다.",
    (row) => `
      <article class="diagnostic-item ${escapeHtml(String(row.severity || "info").toLowerCase())}">
        <strong>
          <span>${escapeHtml(row.kind || "diagnostic")}</span>
          <span>${escapeHtml(formatDateTime(row.created_at))}</span>
        </strong>
        ${diagnosticMessageMarkup(row)}
      </article>
    `,
  );

  renderDiagnosticList(
    el.validationList,
    state.validationRows,
    "운영 검증 기록이 아직 없습니다.",
    (row) => `
      <article class="diagnostic-item info">
        <strong>
          <span>${escapeHtml(row.event_type || "validation")}</span>
          <span>${escapeHtml(formatDateTime(row.created_at || row.event_time))}</span>
        </strong>
        <p>${escapeHtml(`${row.name || row.code || "대상 없음"} / ${row.signal_type || "신호 없음"} / ${row.preset_name || "preset 없음"}`)}</p>
      </article>
    `,
  );

  if (el.mobileDiagnosticList) {
    el.mobileDiagnosticList.innerHTML = el.diagnosticList?.innerHTML || "";
  }
  if (el.mobileValidationList) {
    el.mobileValidationList.innerHTML = el.validationList?.innerHTML || "";
  }
}

const STATUS_ROW_STALE_SECONDS = 75;
const PARTIAL_LIVE_TICK_SECONDS = 75;
const PARTIAL_LIVE_HEARTBEAT_SECONDS = 60;

function formatElapsedLabel(totalSeconds) {
  const seconds = Math.max(0, numberOrZero(totalSeconds));
  if (seconds < 60) return `${seconds}초`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분`;
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return remainMinutes ? `${hours}시간 ${remainMinutes}분` : `${hours}시간`;
}

function statusRowAgeSeconds(status) {
  return secondsSince(
    status.app_status_last_success_at
    || status.updated_at
    || status.generated_at
    || ""
  );
}

function statusSyncDelayInfo(status) {
  const syncState = String(status.app_status_sync_state || "").toLowerCase();
  const rowAge = statusRowAgeSeconds(status);
  const marketOpen = Boolean(status.market_open);
  const lastSuccessAt = status.app_status_last_success_at || status.updated_at || status.generated_at || "";
  const lastFailureAt = status.app_status_last_failure_at || "";
  const syncErrorInfo = summarizeErrorMessage(status.app_status_sync_short_message, status.app_status_sync_error_type);
  const hasExplicitFailure = syncState && syncState !== "ok";
  const staleBecauseOldRow = marketOpen && rowAge > STATUS_ROW_STALE_SECONDS;
  if (!hasExplicitFailure && !staleBecauseOldRow) {
    return { active: false, tone: "ok", label: "", note: "", detail: "" };
  }
  const lastKnownAge = formatElapsedLabel(rowAge);
  return {
    active: true,
    tone: hasExplicitFailure ? "warn" : "pending",
    label: "운영 상태 동기화 지연",
    note: `최근 live 상태를 확인하지 못했습니다. 마지막 정상 상태는 ${lastKnownAge} 전 값입니다.`,
    detail: [
      syncErrorInfo.short || "최근 상태 반영이 지연될 수 있습니다.",
      lastSuccessAt ? `마지막 정상 반영 ${formatDateTime(lastSuccessAt)}` : "",
      lastFailureAt ? `마지막 실패 ${formatDateTime(lastFailureAt)}` : "",
    ].filter(Boolean).join(" / "),
  };
}

function readyCheckDisplay(status) {
  const syncInfo = statusSyncDelayInfo(status);
  const raw = String(status.ready_check_status || "").trim().toLowerCase();
  const generatedAt = status.ready_check_generated_at || status.ready_check_summary?.generated_at || "";
  if (!raw || raw === "pending") {
    return generatedAt
      ? { label: "대기", tone: "pending", note: "최근 ready check 결과를 다시 기다리는 중입니다." }
      : { label: "미실행", tone: "info", note: "아직 ready check를 실행하지 않았습니다." };
  }
  if (syncInfo.active) {
    return {
      label: "stale",
      tone: "warn",
      note: "ready check는 수행됐지만 운영 상태 동기화가 지연돼 최신 반영 여부를 다시 확인해야 합니다.",
    };
  }
  if (raw === "ready" || raw === "ok") return { label: "ready", tone: "ok", note: "최근 ready check가 정상적으로 끝났습니다." };
  if (raw === "warn") return { label: "warn", tone: "warn", note: "ready check 경고 항목이 있어 운영 상태를 같이 보는 편이 좋습니다." };
  if (raw === "fail") return { label: "fail", tone: "error", note: "ready check 실패 항목이 있어 재점검이 필요합니다." };
  if (raw === "stale") return { label: "stale", tone: "warn", note: "ready check 결과가 최신 운영 상태를 충분히 반영하지 못하고 있습니다." };
  return { label: raw, tone: "info", note: "ready check 상태를 확인하는 중입니다." };
}

function presetStatusSummary(status) {
  const manualName = status.selected_preset_name || state.settingsRow?.selected_preset_name || "";
  const manualLabel = status.selected_preset_label || state.settingsRow?.selected_preset_label || manualName || "사용자 설정";
  const effectiveName = status.active_preset_name || manualName || "";
  const effectiveLabel = status.active_preset_label || manualLabel || "확인 중";
  const autoEnabled = Boolean(status.auto_preset_enabled ?? state.settingsRow?.auto_preset_enabled);
  const overrideActive = autoEnabled && manualName && effectiveName && manualName !== effectiveName;
  return {
    manualName,
    manualLabel,
    effectiveName,
    effectiveLabel,
    autoEnabled,
    overrideActive,
  };
}

function hasUsablePartialLiveEvidence(status, collections) {
  const liveState = String(status.live_state || "").toLowerCase();
  const freshness = numberOrZero(status.live_data_freshness_seconds);
  const lastTickFresh = Boolean(status.live_last_tick_at) && freshness > 0 && freshness <= PARTIAL_LIVE_TICK_SECONDS;
  const heartbeatFresh = secondsSince(status.producer_heartbeat_at || status.updated_at || "") <= PARTIAL_LIVE_HEARTBEAT_SECONDS;
  const tapeEnabled = Boolean(status.tape_recording_enabled);
  const focusedFresh = collections.focusedRows.length > 0;
  return lastTickFresh && tapeEnabled && heartbeatFresh && focusedFresh && (liveState === "ok" || liveState === "delayed");
}

function currentLiveCollections() {
  const buyRows = (state.buySignals || []).filter(isFreshRealtimeRowStrict);
  const sellRows = (state.sellSignals || []).filter(isFreshRealtimeRowStrict);
  const earlyRows = (state.earlyDetectionRows || []).filter(isFreshRealtimeRowStrict);
  const focusedRows = (state.focusedRows || []).filter(isFreshRealtimeRowStrict);
  const liveRowCount = buyRows.length + sellRows.length + earlyRows.length + focusedRows.length;
  const status = state.status || {};
  const marketOpen = Boolean(status.market_open);
  const syncInfo = statusSyncDelayInfo(status);
  const liveHealthy = hasUsableLiveStatus(status);
  const partialEvidence = hasUsablePartialLiveEvidence(status, { buyRows, sellRows, earlyRows, focusedRows });
  const recoveringEvidence = marketOpen && (
    liveRowCount > 0
    || Boolean(status.live_last_tick_at)
    || secondsSince(status.producer_heartbeat_at || status.updated_at || "") <= PARTIAL_LIVE_HEARTBEAT_SECONDS
  );
  let effectiveMode = status.dashboard_source_mode || (marketOpen ? "fallback" : "last_market");
  if (syncInfo.active) {
    effectiveMode = marketOpen ? "recovering" : "last_market";
  } else if (!marketOpen) {
    effectiveMode = "last_market";
  } else if (liveHealthy && Boolean(status.live_last_tick_at) && numberOrZero(status.live_data_freshness_seconds) <= 45) {
    effectiveMode = "live";
  } else if (partialEvidence) {
    effectiveMode = "partial_live";
  } else if (recoveringEvidence) {
    effectiveMode = "recovering";
  } else {
    effectiveMode = "fallback";
  }
  return { buyRows, sellRows, earlyRows, focusedRows, liveRowCount, liveHealthy, effectiveMode, syncInfo };
}

function effectiveSourceModeStatus(status) {
  const collections = currentLiveCollections();
  if (collections.syncInfo.active) {
    return {
      label: "동기화 지연",
      tone: collections.syncInfo.tone,
      note: collections.syncInfo.note,
      detail: collections.syncInfo.detail,
    };
  }
  const mode = collections.effectiveMode || status.dashboard_source_mode || "last_market";
  const liveState = String(status.live_state || "stopped").toLowerCase();
  if (mode === "live" && liveState === "ok") {
    return { label: "live 정상", tone: "ok", note: "실시간 데이터가 정상적으로 들어오고 있습니다." };
  }
  if (mode === "live" && liveState === "delayed") {
    return { label: "live 지연", tone: "pending", note: "최근 틱 수신이 조금 늦지만 실시간 흐름은 유지되고 있습니다." };
  }
  if (mode === "partial_live") {
    return { label: "partial live", tone: "pending", note: "실시간 focused 흐름이 아직 유효해 후보와 신호 일부를 함께 보여주고 있습니다." };
  }
  if (mode === "recovering") {
    return { label: "recovering", tone: "warn", note: "최근 live 상태를 완전히 확인하지 못해 복구 중으로 보고 있습니다." };
  }
  if (mode === "fallback") {
    return { label: "snapshot fallback", tone: "warn", note: status.fallback_reason || "현재는 마지막 시장 기준 데이터를 보여주고 있습니다." };
  }
  if (mode === "last_market") {
    return { label: "last_market", tone: "info", note: "현재는 마지막 시장 기준 데이터를 보여주고 있습니다." };
  }
  return { label: "확인 중", tone: "info", note: "실시간 상태를 확인하는 중입니다." };
}

function settingsReflectionStatus(status) {
  const savedAt = status.last_settings_save_at || state.settingsRow?.updated_at || "";
  const appliedAt = status.signal_settings_applied_at || "";
  const presetInfo = presetStatusSummary(status);
  if (state.settingsFetchState?.status === "stale-keep") {
    return {
      label: "마지막 성공 상태 유지",
      tone: "warn",
      note: state.settingsFetchState.note || "설정 읽기 실패로 마지막 성공 상태를 유지합니다.",
    };
  }
  if (!savedAt) {
    return { label: "확인 중", tone: "info", note: "아직 저장된 설정 시각을 받지 못했습니다." };
  }
  if (!appliedAt) {
    return { label: "반영 대기", tone: "pending", note: `저장 ${formatDateTime(savedAt)} / 러너가 새 기준을 다시 읽는 중입니다.` };
  }
  const savedMs = new Date(savedAt).getTime();
  const appliedMs = new Date(appliedAt).getTime();
  if (!Number.isNaN(savedMs) && !Number.isNaN(appliedMs) && appliedMs >= savedMs - 1000) {
    if (presetInfo.overrideActive) {
      return {
        label: "자동추천 override 적용 중",
        tone: "ok",
        note: `수동 저장값 ${presetInfo.manualLabel} / 현재 적용 ${presetInfo.effectiveLabel} / 적용 ${formatDateTime(appliedAt)}`,
      };
    }
    return {
      label: presetInfo.autoEnabled ? "자동추천 반영 완료" : "수동 설정 유지 중",
      tone: "ok",
      note: presetInfo.autoEnabled
        ? `현재 적용 ${presetInfo.effectiveLabel} / 적용 ${formatDateTime(appliedAt)}`
        : `수동 저장값 ${presetInfo.manualLabel} / 적용 ${formatDateTime(appliedAt)}`,
    };
  }
  return { label: "반영 대기", tone: "pending", note: `저장 ${formatDateTime(savedAt)} / 마지막 적용 ${formatDateTime(appliedAt)}` };
}

function diagnosticsStatus(status) {
  const syncInfo = statusSyncDelayInfo(status);
  if (syncInfo.active) {
    return {
      label: "운영 상태 동기화 지연",
      tone: syncInfo.tone,
      note: syncInfo.note,
      detail: syncInfo.detail,
    };
  }
  if (!status.settings_table_available) {
    return { label: "signal_settings 미구성", tone: "warn", note: "signal_settings 테이블이 아직 없어 기본 설정으로 동작 중입니다." };
  }
  if (!status.presets_table_available) {
    return { label: "preset fallback 사용 중", tone: "warn", note: "signal_presets가 없어 내장 추천값을 사용 중입니다." };
  }
  if (status.last_error_message) {
    const errorInfo = summarizeErrorMessage(status.last_error_message, status.last_error_code);
    return {
      label: errorInfo.label || "최근 오류 있음",
      tone: "error",
      note: errorInfo.short,
      detail: errorInfo.detail && errorInfo.detail !== errorInfo.short ? errorInfo.detail : "",
    };
  }
  return { label: "최근 오류 없음", tone: "ok", note: "최근 진단 항목에서 치명적인 오류를 받지 않았습니다." };
}

function renderStatus() {
  const status = state.status || {};
  const sourceInfo = effectiveSourceModeStatus(status);
  const heartbeatInfo = heartbeatStatus(status);
  const settingsInfo = settingsReflectionStatus(status);
  const diagnosticsInfo = diagnosticsStatus(status);
  const readyInfo = readyCheckDisplay(status);
  const presetInfo = presetStatusSummary(status);
  const liveFreshness = numberOrZero(status.live_data_freshness_seconds);
  const regimeLabel = status.current_market_regime_label || status.current_market_regime || "확인 중";
  const liveCollections = currentLiveCollections();
  const syncInfo = liveCollections.syncInfo;

  el.marketStatusLabel.textContent = status.market_phase_label || status.market_status_label || "확인 중";
  el.sourceModeLabel.textContent = sourceInfo.label;
  el.activePresetLabel.textContent = presetInfo.effectiveLabel || "확인 중";
  el.settingsAppliedLabel.textContent = settingsInfo.label;
  el.heartbeatLabel.textContent = heartbeatInfo.label;
  el.lastSignalLabel.textContent = formatDateTime(status.last_signal_at);
  el.statusNotice.textContent = sourceInfo.note || status.notice_text || "실시간 상태를 확인하는 중입니다.";

  const hasQuietMobileNotice = !(
    diagnosticsInfo.tone === "error"
    || diagnosticsInfo.tone === "warn"
    || sourceInfo.tone === "warn"
    || sourceInfo.tone === "pending"
    || readyInfo.tone === "warn"
    || readyInfo.tone === "error"
  );
  el.statusNotice.classList.toggle("is-quiet", hasQuietMobileNotice);

  const topChips = [
    { text: `전체 ${status.total_universe_count || status.watchlist_count || 0}종목`, tone: "info" },
    { text: `후보 ${liveCollections.earlyRows.length}종목`, tone: "pending" },
    { text: `집중 감시 ${liveCollections.focusedRows.length}종목`, tone: "info" },
    { text: `매수 ${liveCollections.buyRows.length}건`, tone: "buy" },
    { text: `매도 ${liveCollections.sellRows.length}건`, tone: "sell" },
    { text: diagnosticsInfo.label, tone: diagnosticsInfo.tone },
  ];
  el.statusChips.innerHTML = topChips
    .map((item) => `<span class="chip ${escapeHtml(item.tone)}">${escapeHtml(item.text)}</span>`)
    .join("");

  if (el.mobileStatusFlags) {
    const mobileFlags = [];
    if (diagnosticsInfo.tone === "error" || diagnosticsInfo.tone === "warn") {
      mobileFlags.push({ text: diagnosticsInfo.label, tone: diagnosticsInfo.tone });
    }
    if (readyInfo.tone === "warn" || readyInfo.tone === "error") {
      mobileFlags.push({ text: `ready ${readyInfo.label}`, tone: readyInfo.tone });
    }
    if (status.last_error_code || status.last_error_message) {
      mobileFlags.push({ text: "오류 있음", tone: "error" });
    }
    if (status.tape_recording_enabled === false) {
      mobileFlags.push({ text: "tape 기록 꺼짐", tone: "warn" });
    }
    el.mobileStatusFlags.innerHTML = mobileFlags
      .slice(0, 3)
      .map((item) => `<span class="chip ${escapeHtml(item.tone)}">${escapeHtml(item.text)}</span>`)
      .join("");
    el.mobileStatusFlags.hidden = mobileFlags.length === 0;
  }

  if (el.mobileStatusDetailBadge) {
    const hasStatusIssue = diagnosticsInfo.tone === "error"
      || diagnosticsInfo.tone === "warn"
      || readyInfo.tone === "warn"
      || readyInfo.tone === "error";
    const badgeTone = diagnosticsInfo.tone === "error" || readyInfo.tone === "error"
      ? "error"
      : hasStatusIssue
        ? "warn"
        : "info";
    const badgeText = diagnosticsInfo.tone === "error" || readyInfo.tone === "error"
      ? "오류"
      : hasStatusIssue
        ? "경고"
        : "정상";
    el.mobileStatusDetailBadge.className = `chip ${badgeTone}`;
    el.mobileStatusDetailBadge.textContent = badgeText;
    el.mobileStatusDetailBadge.hidden = !hasStatusIssue;
  }

  const detailCards = [
    {
      label: "현재 적용 중인 기준",
      value: presetInfo.effectiveLabel || "확인 중",
      note: presetInfo.overrideActive
        ? `수동 저장값 ${presetInfo.manualLabel} / 자동추천 적용값 ${presetInfo.effectiveLabel}`
        : status.active_preset_reason || "현재 운영 중인 기준을 보여줍니다.",
    },
    {
      label: "마지막 수동 저장값",
      value: presetInfo.manualLabel || "사용자 설정",
      note: `${status.auto_preset_enabled ? "자동추천 사용" : "수동 설정 유지"} / 저장 ${formatDateTime(status.last_settings_save_at || state.settingsRow?.updated_at)}`,
    },
    {
      label: "설정 반영 상태",
      value: settingsInfo.label,
      note: settingsInfo.note,
    },
    {
      label: "실시간 freshness",
      value: `${status.live_state || "stopped"} / ${liveFreshness}초`,
      note: `마지막 live tick ${formatDateTime(status.live_last_tick_at)}`,
    },
    {
      label: "오늘 장세",
      value: regimeLabel,
      note: status.regime_summary || "장세를 해석하는 중입니다.",
    },
    {
      label: "최근 설정 변경",
      value: changedSourceLabel(status.settings_changed_source || state.settingsRow?.changed_source),
      note: status.settings_change_reason || state.settingsRow?.change_reason || "최근 변경 사유를 아직 받지 못했습니다.",
    },
    {
      label: "ready check",
      value: readyInfo.label,
      note: readyInfo.note,
    },
    {
      label: "tape recording",
      value: status.tape_recording_enabled ? "on" : "off",
      note: `session ${status.tape_session_id || "-"} / rows ${status.recorded_tape_row_count || 0} / last ${formatDateTime(status.last_tape_write_time)}`,
    },
  ];
  const detailMarkup = detailCards.map((item) => `
    <article class="status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
  el.statusDetailGrid.innerHTML = detailMarkup;
  if (el.mobileStatusDetailGrid) el.mobileStatusDetailGrid.innerHTML = detailMarkup;

  const operationsMarkup = [
    { label: "운영 모드", value: sourceInfo.label, note: sourceInfo.note },
    { label: "producer heartbeat", value: heartbeatInfo.label, note: heartbeatInfo.note },
    {
      label: "상태 동기화",
      value: syncInfo.active ? "지연" : "정상",
      note: syncInfo.active
        ? syncInfo.detail || syncInfo.note
        : `마지막 정상 반영 ${formatDateTime(status.app_status_last_success_at || status.updated_at)}`,
    },
    {
      label: "ready check",
      value: readyInfo.label,
      note: readyInfo.note,
    },
    {
      label: "broad scan quote",
      value: `${numberOrZero(status.broad_scan_quote_failure_ratio).toFixed(1)}% 실패`,
      note: `성공 ${numberOrZero(status.broad_scan_quote_success_count).toFixed(0)} / 실패 ${numberOrZero(status.broad_scan_quote_failure_count).toFixed(0)}`,
    },
    {
      label: "최근 오류",
      value: diagnosticsInfo.label,
      note: diagnosticsInfo.note,
    },
    {
      label: "monitoring level",
      value: status.monitoring_level || "normal",
      note: status.monitoring_level === "monitor" ? "장중 상세 기록 강화 모드입니다." : "일반 운영 기록 모드입니다.",
    },
  ].map((item) => `
    <article class="status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
  el.operationsGrid.innerHTML = operationsMarkup;
  if (el.mobileOperationsGrid) el.mobileOperationsGrid.innerHTML = operationsMarkup;

  const regimeReasons = safeArray(status.market_regime_reasons);
  const notes = [...safeArray(status.runtime_notes), ...regimeReasons, ...Array.from(state.setupNotes)];
  const notesMarkup = notes.length
    ? notes.map((note) => {
      const text = String(note || "");
      const tone = text.includes("오류")
        ? "error"
        : text.includes("fallback") || text.includes("지연") || text.includes("대기")
          ? "warn"
          : "";
      return `<div class="note-item ${tone}">${escapeHtml(text)}</div>`;
    }).join("")
    : `<div class="empty">운영 메모가 아직 없습니다.</div>`;
  el.runtimeNotes.innerHTML = notesMarkup;
  if (el.mobileRuntimeNotes) el.mobileRuntimeNotes.innerHTML = notesMarkup;

  renderDiagnosticList(
    el.diagnosticList,
    state.diagnosticsRows,
    "최근 진단 기록이 아직 없습니다.",
    (row) => `
      <article class="diagnostic-item ${escapeHtml(String(row.severity || "info").toLowerCase())}">
        <strong>
          <span>${escapeHtml(row.kind || "diagnostic")}</span>
          <span>${escapeHtml(formatDateTime(row.created_at))}</span>
        </strong>
        ${diagnosticMessageMarkup(row)}
      </article>
    `,
  );

  renderDiagnosticList(
    el.validationList,
    state.validationRows,
    "운영 검증 기록이 아직 없습니다.",
    (row) => `
      <article class="diagnostic-item info">
        <strong>
          <span>${escapeHtml(row.event_type || "validation")}</span>
          <span>${escapeHtml(formatDateTime(row.created_at || row.event_time))}</span>
        </strong>
        <p>${escapeHtml(`${row.name || row.code || "대상 없음"} / ${row.signal_type || "신호 없음"} / ${row.preset_name || "preset 없음"}`)}</p>
      </article>
    `,
  );

  if (el.mobileDiagnosticList) {
    el.mobileDiagnosticList.innerHTML = el.diagnosticList?.innerHTML || "";
  }
  if (el.mobileValidationList) {
    el.mobileValidationList.innerHTML = el.validationList?.innerHTML || "";
  }
}

function renderMobilePrioritySummary() {
  if (!el.mobileStatusSummary) return;
  const status = state.status || {};
  const sourceInfo = effectiveSourceModeStatus(status);
  const settingsInfo = settingsReflectionStatus(status);
  const diagnosticsInfo = diagnosticsStatus(status);
  const presetInfo = presetStatusSummary(status);
  const compactCards = [
    {
      label: "시장 상태",
      value: status.market_phase_label || status.market_status_label || "확인 중",
      note: status.current_market_regime_label || status.current_market_regime || "장세 해석 대기 중",
    },
    {
      label: "현재 반영 모드",
      value: sourceInfo.label || "확인 중",
      note: sourceInfo.note || "실시간 데이터 반영 상태를 보여줍니다.",
    },
    {
      label: "활성 preset",
      value: presetInfo.effectiveLabel || "확인 중",
      note: presetInfo.overrideActive
        ? `수동 저장값 ${presetInfo.manualLabel} / 자동추천 적용값 ${presetInfo.effectiveLabel}`
        : status.active_preset_reason || "현재 시간대와 장세를 반영한 preset입니다.",
    },
    {
      label: "설정 반영 상태",
      value: settingsInfo.label || "확인 중",
      note: settingsInfo.note || "현재 적용 중인 설정 반영 상태를 보여줍니다.",
    },
    {
      label: "경고 여부",
      value: diagnosticsInfo.label || "확인 중",
      note: diagnosticsInfo.note || "운영상 먼저 확인해야 할 경고 상태를 보여줍니다.",
    },
  ];
  el.mobileStatusSummary.innerHTML = compactCards.map((item) => `
    <article class="status-item mobile-status-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value || "-")}</span>
      <p>${escapeHtml(item.note || "")}</p>
    </article>
  `).join("");
}

function hasExtendedStatusSchema(status) {
  if (!status || typeof status !== "object") return false;
  const requiredKeys = [
    "app_status_sync_state",
    "ready_check_status",
    "tape_recording_enabled",
    "health_guard_state",
    "monitoring_level",
    "session_review_available",
  ];
  return requiredKeys.every((key) => Object.prototype.hasOwnProperty.call(status, key));
}

function statusSyncDelayInfo(status) {
  if (!hasExtendedStatusSchema(status)) {
    return { active: false, tone: "info", label: "", note: "", detail: "" };
  }
  const syncState = String(status.app_status_sync_state || "").toLowerCase();
  const rowAge = statusRowAgeSeconds(status);
  const marketOpen = Boolean(status.market_open);
  const lastSuccessAt = status.app_status_last_success_at || status.updated_at || status.generated_at || "";
  const lastFailureAt = status.app_status_last_failure_at || "";
  const syncErrorInfo = summarizeErrorMessage(status.app_status_sync_short_message, status.app_status_sync_error_type);
  const hasExplicitFailure = syncState && syncState !== "ok";
  const staleBecauseOldRow = marketOpen && rowAge > STATUS_ROW_STALE_SECONDS;
  if (!hasExplicitFailure && !staleBecauseOldRow) {
    return { active: false, tone: "ok", label: "", note: "", detail: "" };
  }
  const lastKnownAge = formatElapsedLabel(rowAge);
  return {
    active: true,
    tone: hasExplicitFailure ? "warn" : "pending",
    label: "운영 상태 동기화 지연",
    note: `최근 live 상태를 확인하지 못했습니다. 마지막 정상 상태는 ${lastKnownAge} 전 값입니다.`,
    detail: [
      syncErrorInfo.short || "최근 상태 반영이 지연되고 있습니다.",
      lastSuccessAt ? `마지막 정상 반영 ${formatDateTime(lastSuccessAt)}` : "",
      lastFailureAt ? `마지막 실패 ${formatDateTime(lastFailureAt)}` : "",
    ].filter(Boolean).join(" / "),
  };
}

function readyCheckDisplay(status) {
  if (!hasExtendedStatusSchema(status)) {
    return {
      label: "미구성",
      tone: "warn",
      note: "app_status 확장 컬럼이 아직 반영되지 않아 ready check 상세를 공개 화면에 모두 표시하지 못하고 있습니다.",
    };
  }
  const syncInfo = statusSyncDelayInfo(status);
  const raw = String(status.ready_check_status || "").trim().toLowerCase();
  const generatedAt = status.ready_check_generated_at || status.ready_check_summary?.generated_at || "";
  if (!raw || raw === "pending" || raw === "not_run") {
    return generatedAt
      ? { label: "대기", tone: "pending", note: "최근 ready check 결과를 다시 확인하는 중입니다." }
      : { label: "미실행", tone: "info", note: "아직 ready check를 실행하지 않았습니다." };
  }
  if (syncInfo.active) {
    return {
      label: "stale",
      tone: "warn",
      note: "ready check는 실행됐지만 운영 상태 동기화가 지연되어 최신 반영 여부를 다시 확인해야 합니다.",
    };
  }
  if (raw === "ready" || raw === "ok") return { label: "ready", tone: "ok", note: "최근 ready check가 정상적으로 끝났습니다." };
  if (raw === "warn") return { label: "warn", tone: "warn", note: "ready check 경고 항목이 있어 운영 상태를 함께 보는 편이 좋습니다." };
  if (raw === "fail") return { label: "fail", tone: "error", note: "ready check 실패 항목이 있어 사전 점검이 필요합니다." };
  if (raw === "stale") return { label: "stale", tone: "warn", note: "ready check 결과가 오래되어 현재 운영 상태를 충분히 반영하지 못하고 있습니다." };
  return { label: raw, tone: "info", note: "ready check 상태를 확인하는 중입니다." };
}

function diagnosticsStatus(status) {
  const syncInfo = statusSyncDelayInfo(status);
  if (syncInfo.active) {
    return {
      label: "운영 상태 동기화 지연",
      tone: syncInfo.tone,
      note: syncInfo.note,
      detail: syncInfo.detail,
    };
  }
  if (!hasExtendedStatusSchema(status)) {
    return {
      label: "운영 상태 컬럼 미반영",
      tone: "warn",
      note: "app_status SQL 최신본이 아직 반영되지 않아 일부 운영 진단 값은 기본 상태만 보여줍니다.",
      detail: "supabase_shared_dashboard.sql의 app_status 확장 컬럼을 다시 적용하면 더 정확한 운영 상태를 볼 수 있습니다.",
    };
  }
  if (!status.settings_table_available) {
    return { label: "signal_settings 미구성", tone: "warn", note: "signal_settings 테이블이 아직 없어 기본 설정으로 동작 중입니다." };
  }
  if (!status.presets_table_available) {
    return { label: "preset fallback 사용 중", tone: "warn", note: "signal_presets가 없어 기본 추천값을 사용 중입니다." };
  }
  if (status.last_error_message) {
    const errorInfo = summarizeErrorMessage(status.last_error_message, status.last_error_code);
    return {
      label: errorInfo.label || "최근 오류 있음",
      tone: "error",
      note: errorInfo.short,
      detail: errorInfo.detail && errorInfo.detail !== errorInfo.short ? errorInfo.detail : "",
    };
  }
  return { label: "최근 오류 없음", tone: "ok", note: "최근 진단 항목에서 치명적인 오류를 받지 않았습니다." };
}

let dashboardBootstrapped = false;

function bootstrapDashboard() {
  if (dashboardBootstrapped) return;
  dashboardBootstrapped = true;
  activateTab(state.activeTab);
  wireEvents();
  bootstrap();
}

window.bootstrapDashboard = bootstrapDashboard;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.bootstrapDashboard?.();
  }, { once: true });
} else {
  window.bootstrapDashboard?.();
}
