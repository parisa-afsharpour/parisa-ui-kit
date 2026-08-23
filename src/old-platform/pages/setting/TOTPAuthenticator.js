import React, {useState} from 'react';
import RaisedButton from "../../components/share/raisedButton/RaisedButton";
import Modal from "../../components/share/modal/Modal";
import TextField from "../../components/share/textField/TextField";
import {postFetcher} from "../../../samab/utils/AxiosRestFetcher";
import {findByStringAddress} from "../../components/share/utils/parser";

function TotpAuthenticator(props) {
    const [showModal, setShowModal] = useState(false)
    const [password, setPassword] = useState(null)
    const [img, setImg] = useState(null)
    const [passwordForm, setPasswordForm] = useState(true)

    const handleShowQrCode = async () => {
        let url = `profile/totp-qrcode`;
        let params = {
            password: password
        }
        let data = await postFetcher(url, params, props.router, findByStringAddress(props.location, 'pathname'), false);
        if (data.status === 200) {
            setPasswordForm(false)
            setImg(data.data.qrCode)
        }


    }
    const handleOnChange = (e, value) => {
        setPassword(value)
        setPasswordForm(true)
    }
    const handleCloseModal = () => {
        setPasswordForm(true)
        setShowModal(false)
    }
    const handleClick = () => {
        setShowModal(true)
        setPassword(null)
    }
    return (
        <div>

            <span> برای فعالسازی برنامه Google Authenticator </span>
            <img style={{height: '20px'}}
                 alt={'Google Authenticator'}
                 src="../../../assets/img/google.png"/>

            <span>  یا  Microsoft Authenticator</span>

            <img style={{height: '20px'}}
                 alt={'Google Authenticator'}
                 src="../../../assets/img/mauth.png"/>

            <span>  را بر روی  تلفن همراه خود نصب نمایید و سپس بر روی دکمه زیر کلیک نمایید.</span>
            <div>
                <RaisedButton label={'نمایش QR Code'}
                              className={'searchButton'}
                              onClick={handleClick}
                              style={{width: '200px', display: 'block', margin: '20px auto'}}
                />
            </div>

            {showModal ? (
                <Modal width='350px' closeModal={handleCloseModal}>
                    {passwordForm ? (
                        <div>
                            <p> برای نمایش QR Code کلمه عبور خود را وارد نمایید</p>
                            <TextField type={'password'} value={password} onChange={handleOnChange}
                                       style={{width: '200px'}} label={'کلمه عبور'} id={'password'}/>

                            <div style={{display: "flex", justifyContent: 'end'}}>
                                <RaisedButton label={'تایید'}
                                              className={'searchButton'}
                                              onClick={handleShowQrCode}

                                />
                            </div>

                        </div>
                    ) : (
                        <div>
                            <p>Qr Code زیر را با تلفن همراه خود اسکن نمایید</p>
                            <img style={{width: '200px', display: 'block', margin: 'auto'}}
                                 alt={'qr-code'}
                                 src={`data:image/png;base64, ${img}`}/>
                        </div>

                    )}


                </Modal>
            ) : null}
        </div>
    );
}

export default TotpAuthenticator;