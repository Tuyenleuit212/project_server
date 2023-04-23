import { useDispatch, useSelector } from 'react-redux'
import styles from './SectionProfile.module.css'
import { RootState } from '../../store/store'
import { useState } from 'react'
import { USER_UPDATE, changeInforUserImage } from '../../slices/authSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SectionProfile = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [userUpdate, setUserUpdate] = useState<USER_UPDATE>({
        name: handleLoginAndCart.user.name,
        email: handleLoginAndCart.user.email,
        phone: handleLoginAndCart.user.phone,
        address: handleLoginAndCart.user.address,
        gender: handleLoginAndCart.user.gender,
        birthday: handleLoginAndCart.user.birthday
    })
    const handleUpdateMeInfor = async (objUpdate: USER_UPDATE) => {
        try {
            const res = await axios.patch('/myway/api/users/updateMe', objUpdate)
            if (res.data.status === "success") {
                console.log(res)
                dispatch(changeInforUserImage({ userDispatch: res.data.user }))
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='col-lg-10 offset-lg-1'>
            <div className={styles.sectionTitle}>
                <p>Thông tin tài khoản</p>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Họ và tên
                        </label>

                        <input value={userUpdate.name} onChange={event => setUserUpdate({ ...userUpdate, name: event.target.value })} />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Ngày sinh (Tháng/Ngày/Năm)
                        </label>

                        <input type='date' value={new Date(userUpdate.birthday).toISOString().substr(0, 10)} onChange={event => setUserUpdate({ ...userUpdate, birthday: new Date(event.target.value) })} />

                    </div>
                </div>

                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Số điện thoại <Link to="" style={{ color: '#00b156' }}>Thay đổi</Link>
                        </label>

                        <input defaultValue={userUpdate.phone} disabled />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Email
                        </label>

                        <input type='email' value={userUpdate.email} onChange={event => setUserUpdate({ ...userUpdate, email: event.target.value })} />
                    </div>
                </div>
            </div>
            <div className={styles.gender}>
                <label>
                    Giới tính
                </label>
                <div className={styles.genderRow}>

                    {
                        ["Nam", "Nữ", "Khác"].map((each, idx) => {
                            return <div className={`${styles.genderGroup}`} key={idx} onClick={event => { setUserUpdate({ ...userUpdate, gender: each }) }}>
                                <div className={each === userUpdate.gender ? `${styles.setBorder} ${styles.borderGender}` : `${styles.borderGender}`}>
                                    <span className={each === userUpdate.gender ? styles.dot : ""}></span>
                                </div>
                                <label>{each}</label>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={styles.sectionAddress}>
                <div className={styles.formGroup}>
                    <label>Địa chỉ</label>
                    <input placeholder='Nhập địa chỉ của bạn' value={userUpdate.address} onChange={event => setUserUpdate({ ...userUpdate, address: event.target.value })} />
                </div>
            </div>

            <div className={styles.formGroup}>
                <button onClick={() => handleUpdateMeInfor(userUpdate)}>CẬP NHẬT</button>
            </div>
        </div>
    )
}

export default SectionProfile