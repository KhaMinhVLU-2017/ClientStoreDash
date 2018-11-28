import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import bg from '../upload/images/waterfall.jpg'
import {Link} from 'react-router-dom'

const styleButton = {
  width: 100,
  background: 'linear-gradient(to left, #a445b2, #d41872, #fa4299)',
  color: 'white',
  fontWeight: 'bold'
}
const styleHeader = {
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 30
}

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', color: '', message: '', login: false }
  }
  render () {
    let arrSentence =[
      ['Người quân tử không đề bạt kẻ biết nói lời hay, cũng không được bỏ ngoài tai lời kẻ xấu nói phải.', 'Khổng Tử'],
      ['Lo thắng người thì loạn, lo thắng mình thì bình.','Lão Tử'],
      ['Nếu muốn được tất cả, phải từ bỏ tất cả.','Lão Tử'],
      ['Hiểu người là khôn, hiểu được mình mới là khôn thật sự.','Lão Tử'],
      ['Lo thắng người thì loạn, lo thắng mình thì bình.','Lão Tử'],
      ['Nếu biết vạn vật đều thay đổi, thì bản thân không nên cố nắm giữ điều chi.','Lão Tử'],
      ['Ai vội vàng tiến lên phía trước đều không thể đi xa.','Lão Tử'],
      ['Ai muốn hiển thị mình sẽ tự làm lu mờ bản thân.','Lão Tử'],
      ['Ai muốn chứng thực bản thân sẽ không tự biết bản thân mình là ai.','Lão Tử'],
      ['Ai muốn ước chế người khác thường không tự ước chế bản thân mình.','Lão Tử'],
      ['Không còn sự đối chọi, ma quỷ tự tiêu tan.','Lão Tử'],
      ['Nếu biết nhìn vào tâm mình, anh có thể tìm thấy tất cả các câu trả lời.','Lão Tử'],
      ['Nhu thắng cương, tĩnh thắng động.','Lão Tử'],
      ['Hãy để mọi chuyện tùy kỳ tự nhiên.','Lão Tử'],
      ['Nếu người muốn co lại, trước hết hãy cho phép nó duỗi ra. Nếu người muốn từ bỏ, hãy cho phép nó nhảy xuất ra. Nếu người muốn có điều gì, trước hết phải cho đi thứ đó.','Lão Tử'],
      ['Những khởi đầu tốt đẹp thường được ngụy trang thành một đoạn kết bi thảm.','Lão Tử'],
      ['Chú tâm đến sự công nhận của người khác rồi người sẽ trở thành tù nhân của chính họ.','Lão Tử'],
      ['Nếu một người có thể nhận ra mình không thiếu thứ gì, cả thiên hạ đã thuộc về người đó.','Lão Tử'],
      ['Vô hình vô tướng là niềm an lạc nhất.','Lão Tử'],
      ['Bậc trí tuệ là người biết những gì mình không biết.','Lão Tử'],
      ['Khi bạn hài lòng đơn giản là chính mình, không so sánh hay cạnh tranh với ai, tất cả mọi người sẽ tôn trọng bạn.','Lão Tử'],
      ['Trí giả nhạo thuỷ, nhân giả nhạo sơn','Lão Tử']
    ]
    let numberRandom = getRandomArbitrary(0,22)
    // console.log(getRandomArbitrary(1,10))
    return (
      <div>
          <img src={bg} style={{ width: '100vw', position: 'relative', height: '100vh', filter: 'brightness(50%)' }} alt='img' />
          <Col style={{ position: 'absolute', maxWidth: 500, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
            <h1 style={styleHeader}>WELLCOME TO WEBSITE</h1>
            <Col md={12} sm={12} xs={12} className='hp_stentence'>
              <p>{arrSentence[numberRandom][0]}</p>
              <p>{arrSentence[numberRandom][1]}</p>
            </Col>
            <Link to='/login'><p>Login</p></Link>
          </Col>
      </div>
    )
  }
}
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
export default HomePage
