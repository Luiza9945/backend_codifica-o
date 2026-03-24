const cores = [
  { id: 1, nome: "Amarelo", exemplo: "Uma banana é amarela." },
  { id: 2, nome: "Azul", exemplo: "O céu é azul." },
  { id: 3, nome: "Cinza", exemplo: "A poeira é cinza." }
]

class ServiceCores {
  getAll() {
    return cores
  }
}

export const service_cores = new ServiceCores()
