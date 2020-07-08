# Understanding Long-Short Term Memory Networks

## Recurrent Neural Networks

New state: $h_t \in \mathbb{R}^H$ 
- Represents the memory of the RNN. Applies an activation (usually $tanh$) to the sum of the previous state and the current input, weighted by $W_{h}$ and $W_{x}$ respectively. 

Old State: $h_{t-1} \in \mathbb{R}^H$
- Memory coming from the previous state

Input vector: $x_t \in \mathbb{R}^D$
- Input $t$ of the sequence $x$

Output vector: $y_t$
- Takes updated state memory $h_t$ to produce an output weighted by $W_hy$

$$
h_t = f_W(h_{t-1}, x_t) = tanh(W_{h} h_{t-1} + W_{x} x_t)
$$
$$
y_t = W_{y}h_t
$$

where $W_h\in \mathbb{R}^{H\times H}$, $W_x\in \mathbb{R}^{H\times D}$, $W_y\in \mathbb{R}^{D\times H}$

We can more concisely represent $h_t^l$ as follows:

$$
h_t = tanh\ W \begin{bmatrix} x_t \\ h_{t-1} \end{bmatrix}
$$

where $W = \begin{bmatrix} W_{x} & W_{h} \end{bmatrix} \in \mathbb{R}^{H\times (D+H)}$ and $h\in \mathbb{R}^n$

## LSTM Neural Networks

LSTM neural networks use the same idea of memory as RNNs but are better at learning long-term dependencies. 

Memory cell: $c_t$ 
- element-wise gate (no linear transform) from one time step to the next

Hidden state: $h_t$
- non-linear, linearly transformed hidden states 

Input vector: $x_t \in \mathbb{R}^D$
- Input $t$ of the sequence $x$

Let us first get an idea of the dimensionality of the weights: $W_{x} \in \mathbb{R}^{4H \times D}, W_h \in \mathbb{R}^{4H \times H}$. $W_x$ weights the inputs $x_t$ and $W_h$ weights the previous hidden state $h_{t-1}$. An important point to make is that $W_x$ and $W_h$ have outer dimension of $4H$. This is because we split the result into four vectors: 
- the input gate $i$
- the forget gate $f$
- the output gate $o$
- the block input $g$

We express the computation concisely below: 

$$
\begin{bmatrix} i \\ f \\ o \\ g \end{bmatrix} = \begin{bmatrix} \sigma \\ \sigma \\ \sigma \\ tanh \end{bmatrix} W \begin{bmatrix} x_t \\ h_{t-1} \end{bmatrix}
$$

where $W = \begin{bmatrix} W_x & W_h \end{bmatrix} \in \mathbb{R}^{4H \times (H + D)}$

We then use $i$, $f$, $o$, and $g$ to calculate the next memory cell and the next hidden state. 

$$c_t = f \odot c_{t-1} + i \odot g$$
$$ h_t = o \odot tanh(c_t)$$

The previous memory cell is gated by the forget gate $f$, which indicates which parts of the memory to forget. We then sum this with the block input $g$ gated by the input gate $i$, giving us the new memory cell. 

The next hidden state takes the new cell memory $c_t$, applies the $tanh$ activation, and gates it with the output gate $o$. 

## References

http://colah.github.io/posts/2015-08-Understanding-LSTMs/

