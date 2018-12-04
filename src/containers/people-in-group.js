import {connect}  from 'react-redux';
import {modalOpen, showMoreGroup} from '../actions/index';
import PeopleInGroup from '../components/people-in-group/people-in-group'
const mapStateToProps = (state, ownProps) => ({
    showMoreGroup: state.showMoreGroup
})

const mapDispatchToProps = dispatch => ({
    onShowMoreGroupClick: isShowMoreGroup => dispatch(showMoreGroup(isShowMoreGroup)),
    setModalOpen:modalopen=>dispatch(modalOpen(modalopen))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleInGroup)
