import React, { useState, useEffect } from 'react';
import { Card, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { API_HOST } from '../../utils/constant';
import { getUserAPI } from "../../API/user";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";

export default function UserByUser(props) {
    const { user } = props;
    const [userInfo, setUserInfo] = useState(null); // Obtener la informacion del user

    useEffect(() => {
        getUserAPI(user.id).then(response => {
            setUserInfo(response);
        })
    }, [user]); // Se ejecuta siempre que user se actualice

    return (
        // eslint-disable-next-line no-undef
        <Card as={Link} to={`/${user.id}`} className="list-users__user">
            <Image
                width={64}
                height={64}
                roundedCircle
                className="mr-3"
                src={
                userInfo?.avatar
                    ? `${API_HOST}/getAvatar?id=${user.id}`
                    : AvatarNotFound
                }
                alt={`${user.nombre} ${user.apellidos}`}
            />
            <Card.Body>
                <h5>
                {user.name} {user.surname}
                </h5>
                <p>{userInfo?.biography}</p>
            </Card.Body>
        </Card>
    );
}
