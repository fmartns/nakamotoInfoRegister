<link rel="stylesheet" type="text/css" href="/src/index.css"></link>
import { Box, Button, Card, Container, Grid, InputAdornment, TextField } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
import style from './AddData.module.css'

export default function AddData(props) {
  const {
    userBio,
    setuserBio,
    addUpdateuserBio,
    next,
  } = props

  const handleChange = (e) => {
    if (
      userBio.name == '' ||
      userBio.phoneNumber == '' ||
      userBio._address == '' ||
      userBio.birthday == ''
    ) {
      alert('Todos os campos são necessários.')
      return
    }
    if (window.confirm('Tem certeza que deseja salvar esses dados?')) {
      next()
    }
  }

  const as = (e) => {
    console.log(e._d.toDateString())
    if(e && e._d)
    setuserBio({ ...userBio, birthDate: e._d.toDateString() })
  }
  return (
    <div className={style.cardContainer}>
      <Card className={style.card} elevation={0}>
        <h2 className={style.h2}>Cadastro cliente</h2>
        <form className={style.form} noValidate autoComplete="off">
        <TextField
            id="outlined-basic"
            label="ID de usuário"
            variant="outlined"
            value={userBio.id}
            onChange={(e) =>
              setuserBio({ ...userBio, id: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Nome completo"
            variant="outlined"
            value={userBio.name}
            onChange={(e) =>
              setuserBio({ ...userBio, name: e.target.value })
            }
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Data de nascimento"
            format="DD/MM/yyyy"
            value={userBio.birthDate}
            // variant="inline"
            inputVariant="outlined"
            onChange={(e) => as(e)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <TextField
            id="outlined-basic"
            label="Telefone"
            variant="outlined"
            value={userBio.phoneNumber}
            InputProps={{
              startAdornment: <InputAdornment position="start">+55</InputAdornment>,
            }}
            onChange={(e) =>
              setuserBio({ ...userBio, phoneNumber: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Endereço"
            variant="outlined"
            value={userBio._address}
            multiline
            rows={2}
            onChange={(e) =>
              setuserBio({ ...userBio, _address: e.target.value })
            }
          />
          <Button className={style.btn} onClick={(e) => handleChange()}>
            Prosseguir
          </Button>
        </form>
      </Card>
    </div>
  )
}
