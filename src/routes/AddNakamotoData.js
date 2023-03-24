import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
import style from './AddData.module.css'

export default function AddNakamotoData(props) {
  const {
    NakamotoData,
    setNakamotoData,
    addUpdateNakamotoData,
    handleBack,
  } = props

  const handleChange = (e) => {
    if (
      NakamotoData.tamanho == '' ||
      NakamotoData.cor == '' ||
      NakamotoData.modalidade == '' ||
      NakamotoData.diseaseName == '' ||
      NakamotoData.infos == '' ||
      NakamotoData.diseaseStartedOn == ''
    ) {
      alert('Todos os campos são necessários.')
      return
    }
    if (window.confirm('Tem certeza que deseja salvar esses dados?')) {
      addUpdateNakamotoData()
    }
  }

  const as = (e) => {
    console.log(e._d.toDateString())
    if (e && e._d)
      setNakamotoData({
        ...NakamotoData,
        diseaseStartedOn: e._d.toDateString(),
      })
  }
  return (
    <div className={style.cardContainer}>
      <Card className={style.card} elevation={0}>
        <h2 className={style.h2}>Detalhes da Compra</h2>
        <form className={style.form} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Código"
            variant="outlined"
            value={NakamotoData.NKMTID}
            onChange={(e) =>
              setNakamotoData({
                ...NakamotoData,
                NKMTID: e.target.value,
              })
            }
          />
          <div  className={style.textFieldGroup}>
            <TextField
              id="outlined-basic"
              label="Tamanho"
              variant="outlined"
              value={NakamotoData.tamanho}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"></InputAdornment>
                ),
              }}
              onChange={(e) =>
                setNakamotoData({
                  ...NakamotoData,
                  tamanho: e.target.value,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Cor"
              variant="outlined"
              value={NakamotoData.cor}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"></InputAdornment>
                ),
              }}
              onChange={(e) =>
                setNakamotoData({
                  ...NakamotoData,
                  cor: e.target.value,
                })
              }
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Categoria"
            variant="outlined"
            value={NakamotoData.diseaseName}
            onChange={(e) =>
              setNakamotoData({
                ...NakamotoData,
                diseaseName: e.target.value,
              })
            }
          />
          <div  className={style.textFieldGroup}>
          <TextField
            id="outlined-basic"
            label="Modalidade de Compra"
            variant="outlined"
            value={NakamotoData.modalidade}
            onChange={(e) =>
              setNakamotoData({
                ...NakamotoData,
                modalidade: e.target.value,
              })
            }
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Data de Compra"
            format="DD/MM/yyyy"
            className={style.date}
            value={NakamotoData.diseaseStartedOn}
            // variant="inline"
            inputVariant="outlined"
            onChange={(e) => as(e)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          </div>
          <TextField
            id="outlined-basic"
            label="Informações adicionais"
            variant="outlined"
            value={NakamotoData.infos}
            multiline
            rows={2}
            onChange={(e) =>
              setNakamotoData({
                ...NakamotoData,
                infos: e.target.value,
              })
            }
          />
          <div className={style.btnGroup}>
            <Button
              className={[style.btn, style.btnRed].join(' ')}
              onClick={handleBack}
            >
              Retornar
            </Button>
            <Button className={style.btn} onClick={(e) => handleChange()}>
              Registrar Informações (Permanente)
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
