type propsType = {
    pos: number
}

const Bear = (props: propsType) => {
    const {pos} = props
    const styles = {
        width: pos === 1? 'calc(100vw/3 - 100vw/6'
            : pos ===2? 'calc(100vw/3 - 100vw/6 + 100vw/3'
            : 'calc(100vw/3 - 100vw/6 + 100vw/3*2'


    }
    return (
        <div style={styles} className="bear_wrapper">
            <div className="bear_figure">
                {
                pos === 1?
                <svg width="300" height="272" viewBox="0 0 300 272" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="l_left_arm_top" d="M58.1938 130L80.3877 130L88.8877 115.313L69.1938 115.313L58.1938 130Z" fill="#9B390F"/>
                <path id="l_left_arm_back" d="M81.6938 173V130H58.1938V173H81.6938Z" fill="#90350E"/>
                <path id="l_left_leg_side" d="M133.694 237L133.694 187.394L141.194 187.395L141.194 224.333L133.694 237Z" fill="#70290C"/>
                <path id="l_left_leg_back" d="M99.1956 237.026L99.1938 187.395L133.694 187L133.694 237.026L99.1956 237.026Z" fill="#6D280A"/>
                <path id="l_right_leg_side" d="M183.194 237L183.194 187.086L190.694 187.086L190.694 223L183.194 237Z" fill="#70290C"/>
                <path id="l_right_leg_back" d="M183.194 237V191H148.194V237H183.194Z" fill="#6D280A"/>
                <path id="l_body_side" d="M199.194 135L226.694 88V155.5L199.194 206V135Z" fill="#792F0F"/>
                <path id="l_body_top" d="M100.694 88L66.1938 135H199.342L226.694 88H100.694Z" fill="#7E2F0D"/>
                <path id="l_body_back" d="M199.33 135H65.6938L70.6938 204.5L199.33 206V135Z" fill="#762E0F"/>
                <path id="l_head_side" d="M176.194 86L188.694 65.5V99.5L175.194 121.5L176.194 86Z" fill="#83320F"/>
                <path id="l_head_top" d="M124.432 65.5L109.694 86H176.194L188.694 65.5H124.432Z" fill="#9B390F"/>
                <path id="l_head_back" d="M176.194 86H109.69L109.194 122L175.201 121.493L176.194 86Z" fill="#91350E"/>
                <path id="l_left_ear" d="M139.86 62.7879L142.194 75H135.583H128.194L130.527 62.7879L135.194 62L139.86 62.7879Z" fill="#1E1E1E"/>
                <path id="l_right_ear" d="M156.694 62.9697L154.194 78H161.277H169.194L166.694 62.9697L161.694 62L156.694 62.9697Z" fill="#1E1E1E"/>
                <path id="l_right_arm_back" d="M233.888 172.993V129.993H210.388V172.993H233.888Z" fill="#90350E"/>
                <path id="l_right_arm_side" d="M241.888 157.759V115.333L233.888 129.993V172.993L241.888 157.759Z" fill="#83320F"/>
                <path id="l_right_arm_top" d="M241.888 115.34L218.888 115.307L210.388 129.993L233.888 129.993L241.888 115.34Z" fill="#9B390F"/>
                </svg>
                
                : pos === 2? 
                <svg width="169" height="171" viewBox="0 0 169 171" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="right_hand_top" d="M167.8 35.4303L143 35.4304L143.4 51.1531L169 51.1531L167.8 35.4303Z" fill="#9B390F"/>
                <path id="right_hand_down" d="M167.822 94L169 51H150V94H167.822Z" fill="#90350E"/>
                <path id="left_hand_top" d="M1.49999 35.4304L32.5 35.4304L32 51.1531L-5.13474e-06 51.1531L1.49999 35.4304Z" fill="#9B390F"/>
                <path id="left_hand_down" d="M1.48746 94L6.10352e-05 51H24.0001V94H1.48746Z" fill="#90350E"/>
                <path id="left_leg" d="M38.4273 170.5L38.4273 122.195L72.7229 121.8L72.7229 170.5L38.4273 170.5Z" fill="#6D280A"/>
                <path id="right_leg" d="M134 170V122H99.0001V170H134Z" fill="#6D280A"/>
                <path id="body_top" d="M19.5 19L15 66H154L149.5 19H19.5Z" fill="#7E2F0D"/>
                <path id="body_down" d="M154 66H15V139H154V66Z" fill="#762E0F"/>
                <path id="head_top" d="M51 2L50 24H117L116.5 2H51Z" fill="#9B390F"/>
                <path id="head_down" d="M117 24H50L49.5 59.5L116 59L117 24Z" fill="#91350E"/>
                <path id="ear_left" d="M71 1L74 16.5H65.5H56L59 1L65 0L71 1Z" fill="#1E1E1E"/>
                <path id="ear_right" d="M96.0001 1L93.0001 16.5H101.5H111L108 1L102 0L96.0001 1Z" fill="#1E1E1E"/>
                </svg>
                
                : 
                <svg id="right_column" width="300" height="272" viewBox="0 0 300 272" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="l_left_arm_top" d="M58.1938 130L80.3877 130L88.8877 115.313L69.1938 115.313L58.1938 130Z" fill="#9B390F"/>
                <path id="l_left_arm_back" d="M81.6938 173V130H58.1938V173H81.6938Z" fill="#90350E"/>
                <path id="l_left_leg_side" d="M133.694 237L133.694 187.394L141.194 187.395L141.194 224.333L133.694 237Z" fill="#70290C"/>
                <path id="l_left_leg_back" d="M99.1956 237.026L99.1938 187.395L133.694 187L133.694 237.026L99.1956 237.026Z" fill="#6D280A"/>
                <path id="l_right_leg_side" d="M183.194 237L183.194 187.086L190.694 187.086L190.694 223L183.194 237Z" fill="#70290C"/>
                <path id="l_right_leg_back" d="M183.194 237V191H148.194V237H183.194Z" fill="#6D280A"/>
                <path id="l_body_side" d="M199.194 135L226.694 88V155.5L199.194 206V135Z" fill="#792F0F"/>
                <path id="l_body_top" d="M100.694 88L66.1938 135H199.342L226.694 88H100.694Z" fill="#7E2F0D"/>
                <path id="l_body_back" d="M199.33 135H65.6938L70.6938 204.5L199.33 206V135Z" fill="#762E0F"/>
                <path id="l_head_side" d="M176.194 86L188.694 65.5V99.5L175.194 121.5L176.194 86Z" fill="#83320F"/>
                <path id="l_head_top" d="M124.432 65.5L109.694 86H176.194L188.694 65.5H124.432Z" fill="#9B390F"/>
                <path id="l_head_back" d="M176.194 86H109.69L109.194 122L175.201 121.493L176.194 86Z" fill="#91350E"/>
                <path id="l_left_ear" d="M139.86 62.7879L142.194 75H135.583H128.194L130.527 62.7879L135.194 62L139.86 62.7879Z" fill="#1E1E1E"/>
                <path id="l_right_ear" d="M156.694 62.9697L154.194 78H161.277H169.194L166.694 62.9697L161.694 62L156.694 62.9697Z" fill="#1E1E1E"/>
                <path id="l_right_arm_back" d="M233.888 172.993V129.993H210.388V172.993H233.888Z" fill="#90350E"/>
                <path id="l_right_arm_side" d="M241.888 157.759V115.333L233.888 129.993V172.993L241.888 157.759Z" fill="#83320F"/>
                <path id="l_right_arm_top" d="M241.888 115.34L218.888 115.307L210.388 129.993L233.888 129.993L241.888 115.34Z" fill="#9B390F"/>
                </svg>
                }
            </div>
        </div>
    )
}

export default Bear