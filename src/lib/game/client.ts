import {
  AddBoardCommand,
  AddBoardReponse,
  AddPointCommand,
  BoardHandlers,
  BoardResponse,
  Handlers,
  RemovePointCommand,
} from "@/handlers/card-genius";

class BoardClient {
  hander;
  boardHandlers;

  customFetch = (url: RequestInfo, init: RequestInit | undefined) => {
    init = init || {};
    init.headers = {
      ...init.headers,
      "Content-Type": "application/json",
    };
    // if (accessToken) {
    //   init.headers = {
    //     ...init.headers,
    //     Authorization: `Bearer ${accessToken}`,
    //   };
    // }
    return fetch(url, init);
  };

  constructor(url: string) {
    this.hander = new Handlers(url, {
      fetch: (url, init) => this.customFetch(url, init),
    });
    this.boardHandlers = new BoardHandlers(url, {
      fetch: (url, init) => this.customFetch(url, init),
    });
  }

  async getBoard(
    boardId: number
  ): Promise<{ data: BoardResponse | null; message: string | null }> {
    var board = await this.hander.boardGet(boardId);
    if (board.statusCode != 200) {
      return {
        message: board.message ?? "Lỗi không xác định",
        data: null,
      };
    }
    return {
      message: null,
      data: board.data,
    };
  }

  async createBoard(
    body: AddBoardCommand
  ): Promise<{ data: AddBoardReponse | null; message: string | null }> {
    var board = await this.hander.boardPost(body);
    if (board.statusCode != 200) {
      return {
        message: board.message ?? "Lỗi không xác định",
        data: null,
      };
    }
    return {
      message: null,
      data: board.data,
    };
  }

  async addPoint(
    body: AddPointCommand
  ): Promise<{ data: boolean; message: string | null }> {
    var rs = await this.boardHandlers.addPoint(body);
    if (rs.statusCode != 200) {
      return {
        message: rs.message ?? "Lỗi không xác định",
        data: false,
      };
    }

    return {
      data: true,
      message: null,
    };
  }

  async removePoint(
    body: RemovePointCommand
  ): Promise<{ data: boolean; message: string | null }> {
    var rs = await this.boardHandlers.removePoint(body);
    if (rs.statusCode != 200) {
      return {
        message: rs.message ?? "Lỗi không xác định",
        data: false,
      };
    }

    return {
      data: true,
      message: null,
    };
  }

}

export const boardClient = new BoardClient("http://45.119.212.162:19400");
