window = global;

var JSEncryt = require('jsencrypt')
    , PVA = '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEpAIBAAKCAQEAy5R1R2yM5jPPvkO2F47qVqMkYj7o92DF8y1yMkCSxY1WwqG0\n' +
    'dCdUZTnaoBuAz99wGt55oGLcdalV71nPUiGWs/b6GzVN5v72baz/Q2OxHtkrFKqL\n' +
    'VX16LW31cW9hAntN84RCbvTeB0MNV+SHmXjIf17OQLCtDKHBZWZ5NKyqFstO+KOd\n' +
    'u32d2jsw+DT5lOBzDUBk/wUw2KyFJVx7eK6sSXEyWqBk2nxMRDNYixIEN1V1EBSq\n' +
    'f+OwKK5Mxi04r38+Qog8z03/t/u6CfAOWVmi+MdrD1VHXv/P7bnFlgRcLzKwK1QL\n' +
    'TSLBE1PrMmNNj0oRjByhMoI9tY5X6mRBqLyDhwIDAQABAoIBAGO++RmGO6D9CNAJ\n' +
    '4Bm52eKaK5UBiubOIR8NiNLLZb5qinRxg3eX35d7Wb2xzBLNwOFBWSl21trFncfY\n' +
    '4qY0s+C4ZYHYQ7Om/7nsFeQAYAOj1yJYj01TXf4NTsGGF2t+W8qxZlV0H6dCOLL0\n' +
    'U2YkUmRp4Le8eQVj6dyTcVaYNPxWQBnb9ZOEIEvEjeoO/DD7CCmt7LDCey9KrTQl\n' +
    'Avuc2nN6uRV1Wfm0P8conKPJtVdgzMvJujNdpz+bBDqwsqgeCICjs/hSCNO81VH3\n' +
    'DD7J0mG2OHqowOVqagoDHpBprHOUKxAeTs9I0KEL+hEI4zXCDL69+Xs6azuts733\n' +
    'zSOmwxkCgYEA25czfPVxxcK685LhaAvwbmzWHqNp07ytRNGf+Aww6OdgWkdgPy0n\n' +
    '20Gkg0HAqsxGcgZJk6cAkOy5hBLNHpHlGbeWFi+62lVNYUv3hAxumtiPyBMu7avE\n' +
    'ZQCTXND1H1f/2enRDJRxQsR8y/SX1ivmC5U6fx7hbpKxnXyRHnvSlk8CgYEA7VWp\n' +
    'hLNkn4AEaPPW0TknwKG40At/hjecX2zWAyZVt4ydDSeKgMEOUdmvGGlSCrefAl0n\n' +
    'PTfM9SdIDcO5OTa2wUayKLIsrb6TDnG6KXXN6z3HR3Q4qKJbG83eaMYDqqziPPV+\n' +
    'xzRVWShI3EGwkLczASmiYy+sEAT0OkxP59xTKUkCgYBgaGjFkukJfy4fJDxsNtmv\n' +
    'UX9MYkhjGrIjxbjq6UdL6dGGsVGTSxr1i0NUETkqg5bmFtaUybxY5GWqk6qUok8o\n' +
    'VE7DnN73Xn4jmnun8OFagHvXxnxTApeuFGueU2tbAIKmxJ3wXPfA7Y0w6kkDUbCl\n' +
    'IzZUe1VT+3mZgAgijxBsxwKBgQDNytiJ62/V6hBo3P6pPtEcdF6nb0DtpazfBaVw\n' +
    '572twaywqlermzsKeCIenbx49I1ZZGLQ72C2NpCA9vTWCn5fiyiSpyScp0ImZTDS\n' +
    'IIckctYoPDug5d7wdgtjeEfXp78osopyuwtCmu7Kpd8vLNt6J5raPI0K+vC22FL1\n' +
    'LpOhmQKBgQCFeU448fL87N1MjMyusi8wJ5MLcn+kHbLTtpskTpfQM2p3Cnp4oL+7\n' +
    'BI4AlXlKItV37rJIjZxQgLWhGoTZPplZaW4ooJCFJbazce5ua5fnsFS0oXhDN7uw\n' +
    'jaq+v5t8G6gFS09hEa4kz9O53t/7UGuQqh0Bxb0cJ9iNeAlhagvBDQ==\n' +
    '-----END RSA PRIVATE KEY-----\n';

var A = new JSEncryt();
A.setPrivateKey(PVA)

function get_decrypt_data(encrypt_data) {
    return JSON.parse(A.decrypt(encrypt_data))
}