import {connect}  from 'react-redux';
import {groupData, modalOpen, showMoreGroup} from '../actions/index';
import GroupList from '../components/group-list/group-list'
const mapStateToProps = (state, ownProps) => ({
    showMoreGroup: state.showMoreGroup,
    groupData: state.groups
})

const mapDispatchToProps = dispatch => ({
    onShowMoreGroupClick: isShowMoreGroup => dispatch(showMoreGroup(isShowMoreGroup)),
    setGroups: data => dispatch(groupData(data)),
    setModalOpen:modalopen=>dispatch(modalOpen(modalopen))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)( GroupList)
